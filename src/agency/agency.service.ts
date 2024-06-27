import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { DataSource, Repository } from 'typeorm';
import { Agency } from './entities/agency.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class AgencyService {
  private logger = new Logger('AgencyService');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('AGENCY_REPOSITORY')
    private agencyRepository: Repository<Agency>,
  ) {}
  async create(dto: CreateAgencyDto) {
    const user = new Agency({ ...dto });

    try {
      const userCreate = await this.agencyRepository.save(user);
      return userCreate;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(options: IPaginationOptions) {
    const queryBuilder = this.agencyRepository
      .createQueryBuilder('agency')
      .orderBy('agency.id', 'ASC');

    const paginatedResult = await paginate<Agency>(queryBuilder, options);

    return paginatedResult;
  }

  async findOne(id: number) {
    const client = await this.agencyRepository.findOne({
      where: {
        id,
      },
    });

    return client;
  }

  async update(id: number, dto: UpdateAgencyDto): Promise<void> {
    try {
      const updateAgency = await this.agencyRepository.update({ id }, dto);

      if (!updateAgency.affected)
        throw new HttpException('Agency not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const client = await this.agencyRepository.delete(id);
      if (client.affected) return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return false;
  }
}
