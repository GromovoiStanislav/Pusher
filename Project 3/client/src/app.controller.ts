import { Body, Controller, Delete, Post, Param } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { PusherService } from "./pusher/pusher.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageDto } from "./dto/message.dto";


@Controller()
export class AppController {

  constructor(
    private pusherService: PusherService
  ) {
  }

  @Post("messages")
  async createMessage(@Body() data: CreateMessageDto): Promise<MessageDto> {
    const message: MessageDto = {
      id: randomUUID(),
      username: data.username,
      message: data.message
    };

    await this.pusherService.trigger("chat", "message/add", message);
    return message;
  }


  @Delete("messages/:id")
  async deleteMessages(@Param("id") id: string): Promise<string> {
    await this.pusherService.trigger("chat", "message/delete", id);
    return "OK";
  }


}