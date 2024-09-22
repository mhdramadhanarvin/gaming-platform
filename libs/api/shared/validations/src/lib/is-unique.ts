import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions } from 'class-validator';

export type IsUniqueConstraintInput = {
  tableName: string;
  column: string;
};

export function IsUnique(
  options: IsUniqueConstraintInput,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsUniqueConstraintInput = args.constraints[0];

    const exists = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    return exists ? false : true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const column_name = validationArguments.constraints[0]['column'];
    return `the record ${column_name} already exist`;
  }
}
