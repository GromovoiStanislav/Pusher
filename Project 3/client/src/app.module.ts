import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { PusherModule } from "./pusher/pusher.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PusherModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
