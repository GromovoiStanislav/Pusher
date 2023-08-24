import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { PusherModule } from "./pusher/pusher.module";
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PusherModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
