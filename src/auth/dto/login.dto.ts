import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ type: String, description: 'email address' })
  @IsString()
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
