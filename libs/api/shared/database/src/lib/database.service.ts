import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
  QueryRunner,
  FindOptionsWhere,
  FindOptionsRelations,
  DeepPartial,
} from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  getRepository<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>
  ): Repository<Entity> {
    return this.dataSource.getRepository(entity);
  }

  createQueryBuilder<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<Entity> {
    return this.dataSource
      .createQueryBuilder<Entity>(entity, alias, queryRunner)
      .setFindOptions({ cache: true });
  }

  async executeQuery<Entity extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<Entity>
  ): Promise<Entity[]> {
    return queryBuilder.getMany();
  }

  applyFilter<Entity extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<Entity>,
    filter: Partial<Entity>,
    alias: string
  ): SelectQueryBuilder<Entity> {
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined) {
        queryBuilder.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
      }
    });
    return queryBuilder;
  }

  applyPagination<Entity extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<Entity>,
    page: number,
    pageSize: number
  ): SelectQueryBuilder<Entity> {
    return queryBuilder.skip((page - 1) * pageSize).take(pageSize);
  }

  applySort<Entity extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<Entity>,
    sort: Partial<Record<keyof Entity, 'ASC' | 'DESC'>>,
    alias: string
  ): SelectQueryBuilder<Entity> {
    Object.entries(sort).forEach(([key, order]) => {
      queryBuilder.addOrderBy(`${alias}.${key}`, order);
    });
    return queryBuilder;
  }

  // New methods for transactions
  async runInTransaction<T>(
    operation: (queryRunner: QueryRunner) => Promise<T>
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await operation(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // New method for relationship queries
  async findWithRelations<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
    where: FindOptionsWhere<Entity>,
    relations: FindOptionsRelations<Entity>
  ): Promise<Entity[]> {
    const repository = this.getRepository(entity);
    return repository.find({ where, relations });
  }

  // New method for custom queries
  async executeRawQuery<T = any>(
    query: string,
    parameters?: any[]
  ): Promise<T> {
    return this.dataSource.query(query, parameters);
  }

  // New method for bulk insert
  async bulkInsert<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
    data: DeepPartial<Entity>[]
  ): Promise<Entity[]> {
    const repository = this.getRepository(entity);
    const entities = repository.create(data);
    return repository.save(entities as Entity[]);
  }

  // New method for soft delete
  async softDelete<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
    criteria: FindOptionsWhere<Entity>
  ): Promise<void> {
    const repository = this.getRepository(entity);
    await repository.softDelete(criteria);
  }

  // New method for count
  async count<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
    criteria: FindOptionsWhere<Entity>
  ): Promise<number> {
    const repository = this.getRepository(entity);
    return repository.count({ where: criteria });
  }
}
