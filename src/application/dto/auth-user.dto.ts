import { IsNumber, IsString, IsUUID } from 'class-validator';

export class AuthUserDto {
  @IsUUID()
  id: string;

  @IsNumber()
  sub: number;

  @IsString()
  name: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
