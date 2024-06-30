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
import { DataSource, Like, Repository } from 'typeorm';
import { Agency } from './entities/agency.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { AgencyFilter } from './dto/agency-filter.dto';

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
      this.logger.error(`${this.create.name} -- ${error}`);
      throw new InternalServerErrorException();
    }
  }

  async findAll(options: IPaginationOptions, filter: AgencyFilter) {
    const whereConditions: Record<string, any>[] = [];

    whereConditions.push({
      is_deleted: false,
    });

    if (filter.name) {
      whereConditions.push({
        name: Like(`%${filter.name}%`),
      });
    }

    const paginationResult: Pagination<Agency> = await paginate(
      this.agencyRepository,
      options,
      {
        where: {
          ...whereConditions.reduce(
            (acc, condition) => ({ ...acc, ...condition }),
            {},
          ),
        },
        order: {
          created_at: 'DESC',
        },
      },
    );

    return paginationResult;
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
      this.logger.error(`${this.update.name} -- ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const client = await this.agencyRepository.delete(id);
      if (client.affected) return true;
    } catch (error) {
      this.logger.error(`${this.remove.name} -- ${error}`);
      throw new InternalServerErrorException();
    }
    return false;
  }
}
