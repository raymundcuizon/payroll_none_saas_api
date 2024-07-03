import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { DeductionService } from 'src/deduction/deduction.service';
import { AllowanceService } from 'src/allowance/allowance.service';
import { CreateEmployeeAllowanceDto } from './dto/create-employee-allowance.dto';
import { CreateEmployeeDeductionDto } from './dto/create-employee-deduction.dto';
import { EmployeeAllowance } from './entities/employee-allowance.entity';
import { EmployeeDeduction } from './entities/employee-deduction.entity';

@Injectable()
export class EmployeeService {
  private logger = new Logger('EmployeeService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
    @Inject('EMPLOYEE_ALLOWANCE_REPOSITORY')
    private employeeAllowanceRepository: Repository<EmployeeAllowance>,
    @Inject('EMPLOYEE_DEDUCTION_REPOSITORY')
    private employeeDeductioneRepository: Repository<EmployeeDeduction>,
    private readonly deductionService: DeductionService,
    private readonly allowanceService: AllowanceService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const newData = new Employee({
      ...createEmployeeDto,
    });
    try {
      const response = await this.employeeRepository.save(newData);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async addAllowance(dto: CreateEmployeeAllowanceDto) {
    const newData = new EmployeeAllowance({
      ...dto,
    });
    try {
      const response = await this.employeeAllowanceRepository.save(newData);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
  async addDeduction(dto: CreateEmployeeDeductionDto) {
    const newData = new EmployeeDeduction({
      ...dto,
    });
    try {
      const response = await this.employeeDeductioneRepository.save(newData);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all employee`;
  }

  async findOne(id: number) {
    const client = await this.employeeRepository.findOne({
      where: {
        id,
      },
      relations: {
        allowances: {
          allowance: true,
        },
        deductions: {
          deduction: true,
        },
      },
    });

    return client;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
