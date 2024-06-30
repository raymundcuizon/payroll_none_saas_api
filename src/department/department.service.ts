import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DataSource, Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class DepartmentService {
  private logger = new Logger('DepartmentService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: Repository<Department>,
  ) {}

  async create(dto: CreateDepartmentDto) {
    const newData = new Department({ ...dto });

    try {
      const response = await this.departmentRepository.save(newData);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(options: IPaginationOptions) {
    const queryBuilder = this.departmentRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC');

    const paginatedResult = await paginate<Department>(queryBuilder, options);

    return paginatedResult;
  }

  async findOne(id: number) {
    const response = await this.departmentRepository.findOne({
      where: {
        id,
      },
    });

    return response;
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<void> {
    try {
      const update = await this.departmentRepository.update({ id }, dto);

      if (!update.affected)
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const remove = await this.departmentRepository.delete(id);
      if (remove.affected) return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return false;
  }
}
