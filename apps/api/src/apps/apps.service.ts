import { Injectable } from "@nestjs/common";

@Injectable()
export class AppsService {
  getApps(): string {
    return "Welcome to Gaming Platform v1.0";
  }
}
