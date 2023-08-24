import { Injectable, OnModuleInit } from "@nestjs/common";
import { PusherService } from "./pusher/pusher.service";
import { MessageDto } from "./dto/message.dto";

@Injectable()
export class AppService implements OnModuleInit {

  private messages: MessageDto[] = [];

  constructor(
    private pusherService: PusherService
  ) {

  }

  onModuleInit() {
    const channel = this.pusherService.getChannel("chat");

    channel.bind("message/add", (data) => {
      this.messages.push({
        id: data.id,
        username: data.username,
        message: data.message
      });
    });

    channel.bind("message/delete", (data) => {
      const index = this.messages.findIndex((message) => message.id === data);
      if (index !== -1) {
        this.messages.splice(index, 1);
      }
    });
  }


  async getAllMessages(): Promise<MessageDto[]> {
    return this.messages;
  }
}
