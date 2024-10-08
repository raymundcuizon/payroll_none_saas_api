import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('UserRepository');

  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User({ ...createUserDto });

    try {
      const userCreate = await this.userRepository.save(user);
      return userCreate;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async verifyUserEmail(email: string) {
    try {
      const updateAgency = await this.userRepository.update(
        { email },
        {
          email_vefiried: true,
        },
      );

      if (!updateAgency.affected)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async adminConfirmUser(email: string) {
    try {
      const updateAgency = await this.userRepository.update(
        { email },
        {
          account_confirmed: true,
        },
      );

      if (!updateAgency.affected)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
