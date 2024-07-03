import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { DataSource, In, Repository } from 'typeorm';
import { Deduction } from './entities/deduction.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class DeductionService {
  private logger = new Logger('DeductionService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('DEDUCTION_REPOSITORY')
    private deductionRepository: Repository<Deduction>,
  ) {}

  async create(dto: CreateDeductionDto) {
    const newData = new Deduction({ ...dto });

    try {
      const response = await this.deductionRepository.save(newData);
      return response;
    } catch (error) {
      this.logger.error(`${this.create.name} -- ${error}`);
      throw new InternalServerErrorException();
    }
  }

  async findAll(options: IPaginationOptions) {
    const queryBuilder = this.deductionRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC');

    const paginatedResult = await paginate<Deduction>(queryBuilder, options);

    return paginatedResult;
  }

  async findOne(id: number) {
    const response = await this.deductionRepository.findOne({
      where: {
        id,
      },
    });

    return response;
  }

  async findWhereAgencID_IdIn(agency_id: number, ids: number[]) {
    const response = await this.deductionRepository.find({
      where: {
        id: In(ids),
        agency_id,
      },
    });

    return response;
  }

  async update(id: number, dto: UpdateDeductionDto): Promise<void> {
    try {
      const update = await this.deductionRepository.update({ id }, dto);

      if (!update.affected)
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error(`${this.update.name} -- ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const remove = await this.deductionRepository.delete(id);
      if (remove.affected) return true;
    } catch (error) {
      this.logger.error(`${this.remove.name} -- ${error}`);
      throw new InternalServerErrorException();
    }
    return false;
  }
}
