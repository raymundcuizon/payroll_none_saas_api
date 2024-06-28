import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DataSource, Repository } from 'typeorm';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  private logger = new Logger('PositionService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('POSITION_REPOSITORY')
    private positionRepository: Repository<Position>,
  ) {}

  create(createPositionDto: CreatePositionDto) {
    return 'This action adds a new position';
  }

  findAll() {
    return `This action returns all position`;
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
