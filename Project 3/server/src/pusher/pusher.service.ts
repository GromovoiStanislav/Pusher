import { Injectable } from "@nestjs/common";
import * as Pusher from "pusher-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PusherService {
  pusher: any;

  constructor(private configService: ConfigService) {
    // @ts-ignore
    this.pusher = new Pusher(this.configService.get<string>("APP_KEY"), {
      cluster: this.configService.get<string>("APP_CLUSTER")
    });
  }

  getChannel(channel: string) {
    return this.pusher.subscribe(channel);
  }

}