import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateEmployeeAllowanceDecorator,
  CreateEmployeeDecorator,
  CreateEmployeeDeductionDecorator,
} from './decorators';
import { AgencyService } from 'src/agency/agency.service';
import { CreateEmployeeAllowanceDto } from './dto/create-employee-allowance.dto';
import { CreateEmployeeDeductionDto } from './dto/create-employee-deduction.dto';

@Controller('employee')
@ApiTags('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly agencySerive: AgencyService,
  ) {}

  @Post()
  @CreateEmployeeDecorator()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const checkIfAgencyExist = await this.agencySerive.findOne(
      createEmployeeDto.agency_id,
    );

    if (!checkIfAgencyExist) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return this.employeeService.create(createEmployeeDto);
  }

  @Post('add-allowance')
  @CreateEmployeeAllowanceDecorator()
  async addAllowance(@Body() dto: CreateEmployeeAllowanceDto) {
    return await this.employeeService.addAllowance(dto);
  }

  @Post('add-deduction')
  @CreateEmployeeDeductionDecorator()
  async addDeduction(@Body() dto: CreateEmployeeDeductionDto) {
    return await this.employeeService.addDeduction(dto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
