import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessageDto } from "./dto/message.dto";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {
  }

  @Get("messages")
  async getMessages(): Promise<MessageDto[]> {
    return this.appService.getAllMessages();
  }

}