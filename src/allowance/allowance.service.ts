import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { DataSource, Repository } from 'typeorm';
import { Allowance } from './entities/allowance.entity';

@Injectable()
export class AllowanceService {
  private logger = new Logger('AllowanceService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('ALLOWANCE_REPOSITORY')
    private allowanceRepository: Repository<Allowance>,
  ) {}

  create(createAllowanceDto: CreateAllowanceDto) {
    return 'This action adds a new allowance';
  }

  findAll() {
    return `This action returns all allowance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} allowance`;
  }

  update(id: number, updateAllowanceDto: UpdateAllowanceDto) {
    return `This action updates a #${id} allowance`;
  }

  remove(id: number) {
    return `This action removes a #${id} allowance`;
  }
}
