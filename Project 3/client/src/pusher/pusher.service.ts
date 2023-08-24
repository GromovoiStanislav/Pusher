import { Injectable } from "@nestjs/common";
import * as Pusher from "pusher";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PusherService {
  pusher: Pusher;



  constructor(private configService: ConfigService) {
    this.pusher = new Pusher({
      appId: this.configService.get<string>('APP_ID'),
      key: this.configService.get<string>('APP_KEY'),
      secret: this.configService.get<string>('APP_SECRET'),
      cluster: this.configService.get<string>('APP_CLUSTER'),
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }
}