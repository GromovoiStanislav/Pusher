import { Injectable } from "@nestjs/common";
import * as Pusher from "pusher-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PusherService {
  private pusher: any;

  //private channelMap: { [key: string]: any } = {};
  private channelMap:  Record<string, any> = {};

  constructor(private configService: ConfigService) {
    // @ts-ignore
    this.pusher = new Pusher(this.configService.get<string>("APP_KEY"), {
      cluster: this.configService.get<string>("APP_CLUSTER")
    });
  }

  private createChannel(channel: string) {
    const channelInstance = this.pusher.subscribe(channel);
    this.channelMap[channel] = channelInstance;
    return channelInstance;
  }

  getChannel(channel: string) {
    if (this.channelMap.hasOwnProperty(channel)) {
      return this.channelMap[channel];
    } else {
      return this.createChannel(channel);
    }
  }

}