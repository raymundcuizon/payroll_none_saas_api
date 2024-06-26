import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
  applyDecorators,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginAuthDto } from '../dto/login.dto';
import { AuthUserRegisterDto } from '../dto/auth-user-register.dto';
import { Type } from '@nestjs/common/interfaces';

function AuthDecorator(dto: Type<any>, responseType: Type<any> = null) {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiResponse({ status: HttpStatus.OK, type: responseType || Object }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      type: UnauthorizedException,
    }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException }),
    ApiBody({ type: dto }),
    UsePipes(new ValidationPipe({ transform: true })),
  );
}

export function AuthLoginDecorator() {
  return AuthDecorator(LoginAuthDto, LoginResponseDto);
}

export function AuthUserRegisterDecorator() {
  return AuthDecorator(AuthUserRegisterDto);
}
