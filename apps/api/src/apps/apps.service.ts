import { Injectable } from "@nestjs/common";

@Injectable()
export class AppsService {
  getApps() {
    return {
      message: "Welcome to Gaming Platform",
      time: new Date().getTime(),
    };
  }
}
