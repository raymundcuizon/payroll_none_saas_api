import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { DataSource, In, Repository } from 'typeorm';
import { Allowance } from './entities/allowance.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class AllowanceService {
  private logger = new Logger('AllowanceService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('ALLOWANCE_REPOSITORY')
    private allowanceRepository: Repository<Allowance>,
  ) {}

  async create(dto: CreateAllowanceDto) {
    const newData = new Allowance({ ...dto });

    try {
      const response = await this.allowanceRepository.save(newData);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(options: IPaginationOptions) {
    const queryBuilder = this.allowanceRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC');

    const paginatedResult = await paginate<Allowance>(queryBuilder, options);

    return paginatedResult;
  }

  async findOne(id: number) {
    const response = await this.allowanceRepository.findOne({
      where: {
        id,
      },
    });

    return response;
  }

  async findWhereAgencID_IdIn(agency_id: number, ids: number[]) {
    const response = await this.allowanceRepository.find({
      where: {
        id: In(ids),
        agency_id,
      },
    });

    return response;
  }

  async update(id: number, dto: UpdateAllowanceDto): Promise<void> {
    try {
      const update = await this.allowanceRepository.update({ id }, dto);

      if (!update.affected)
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const remove = await this.allowanceRepository.delete(id);
      if (remove.affected) return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return false;
  }
}
