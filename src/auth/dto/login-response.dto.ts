import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ type: String, description: 'accessToken' })
  idToken: string;
  @ApiProperty({ type: String, description: 'refreshToken' })
  refreshToken: string;
  @ApiProperty({ type: Number, description: 'refreshToken' })
  exp: number;
  @ApiProperty({ type: String, description: 'ok | failed' })
  status: Number;
}
