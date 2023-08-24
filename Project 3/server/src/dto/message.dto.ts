import { IsString,IsNotEmpty } from "class-validator";

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}