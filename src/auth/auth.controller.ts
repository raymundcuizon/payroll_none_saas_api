import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

  @Post('confirmRegistration')
  async confirmRegistration() {
    return await this.authService.confirmRegistration();
  }

  @Post('login')
  @AuthLoginDecorator()
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('refreshToken')
  async refreshToken() {
    return await this.authService.refreshToken('SAD', 'SAD');
  }

  @Post('adminConfirmUser')
  async adminConfirmUser() {
    return await this.authService.adminConfirmUser();
  }

  @Post('verifyUserEmail')
  async verifyUserEmail() {
    return await this.authService.verifyUserEmail('raymundcuizon@gmail.com');
  }
}
