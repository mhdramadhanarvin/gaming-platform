import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getApps(): string {
    return "Welcome to Gaming Platform. Version 1.0";
  }
}
