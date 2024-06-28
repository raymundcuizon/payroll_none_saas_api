import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { DataSource, Repository } from 'typeorm';
import { Deduction } from './entities/deduction.entity';

@Injectable()
export class DeductionService {
  private logger = new Logger('DeductionService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('DEDUCTION_REPOSITORY')
    private deductionRepository: Repository<Deduction>,
  ) {}

  create(createDeductionDto: CreateDeductionDto) {
    return 'This action adds a new deduction';
  }

  findAll() {
    return `This action returns all deduction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deduction`;
  }

  update(id: number, updateDeductionDto: UpdateDeductionDto) {
    return `This action updates a #${id} deduction`;
  }

  remove(id: number) {
    return `This action removes a #${id} deduction`;
  }
}
