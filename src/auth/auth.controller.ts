import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authentication, CognitoUser } from '@nestjs-cognito/auth';
import { ApiBody, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import {
  AuthLoginDecorator,
  AuthUserRegisterDecorator,
} from './decorators/auth.decorator';
import { AuthUserRegisterDto } from './dto/auth-user-register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @Authentication()
  @ApiSecurity('accessToken')
  getMe(@CognitoUser() user) {
    return user;
  }

  @Post('user-register')
  @AuthUserRegisterDecorator()
  async register(@Body() dto: AuthUserRegisterDto) {
    return await this.authService.registerUser(dto);
  }

  // @Post('confirmRegistration')
  // async confirmRegistration() {
  //   return await this.authService.confirmRegistration();
  // }

  @Post('login')
  @AuthLoginDecorator()
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  // @Post('refreshToken')
  // async refreshToken() {
  //   return await this.authService.refreshToken('SAD', 'SAD');
  // }

  @Patch('admin-confirm-user/:email')
  async adminConfirmUser(@Param('email') email: string) {
    return await this.authService.adminConfirmUser(email);
  }

  @Patch('verify-user-email/:email')
  async verifyUserEmail(@Param('email') email: string) {
    return await this.authService.verifyUserEmail(email);
  }
}
