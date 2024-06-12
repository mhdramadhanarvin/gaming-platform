import { Controller, Get } from "@nestjs/common";
import { AppsService } from "./apps.service";

@Controller()
export class AppsController {
  constructor(private appsService: AppsService) { }

  @Get()
  getApps() {
    return this.appsService.getApps();
  }
}
