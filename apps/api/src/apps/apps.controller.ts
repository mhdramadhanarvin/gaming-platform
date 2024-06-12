import { Controller, Get } from "@nestjs/common";
import { AppsService } from "./apps.service";

@Controller()
export class AppsController {
  constructor(private appsService: AppsService) { }

  @Get("health")
  get(): string {
    return this.appsService.getApps();
  }
}
