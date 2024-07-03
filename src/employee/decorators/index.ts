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
import { ApiBody, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { Type } from '@nestjs/common/interfaces';
import { Authentication } from '@nestjs-cognito/auth';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { CreateEmployeeAllowanceDto } from '../dto/create-employee-allowance.dto';
import { CreateEmployeeDeductionDto } from '../dto/create-employee-deduction.dto';

function decorator(
  dto: Type<any>,
  responseType: Type<any> = null,
  additionalDecorators: any[] = [],
) {
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
    ...additionalDecorators,
  );
}

export function CreateEmployeeDecorator() {
  return decorator(CreateEmployeeDto, null);
}

export function CreateEmployeeAllowanceDecorator() {
  return decorator(CreateEmployeeAllowanceDto, null);
}

export function CreateEmployeeDeductionDecorator() {
  return decorator(CreateEmployeeDeductionDto, null);
}
