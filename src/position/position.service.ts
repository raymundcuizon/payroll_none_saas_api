import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DataSource, Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PositionService {
  private logger = new Logger('PositionService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('POSITION_REPOSITORY')
    private positionRepository: Repository<Position>,
  ) {}

  async create(dto: CreatePositionDto) {
    const newData = new Position({ ...dto });

    try {
      const response = await this.positionRepository.save(newData);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(options: IPaginationOptions) {
    const queryBuilder = this.positionRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC');

    const paginatedResult = await paginate<Position>(queryBuilder, options);

    return paginatedResult;
  }

  async findOne(id: number) {
    const response = await this.positionRepository.findOne({
      where: {
        id,
      },
    });

    return response;
  }

  async update(id: number, dto: UpdatePositionDto): Promise<void> {
    try {
      const update = await this.positionRepository.update({ id }, dto);

      if (!update.affected)
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const remove = await this.positionRepository.delete(id);
      if (remove.affected) return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return false;
  }
}
