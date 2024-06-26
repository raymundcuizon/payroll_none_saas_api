import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Entity,
  Column,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  Generated,
  Index,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

export enum USER_GENDER_ENUM {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

@Entity()
@Unique(['email', 'cognito_id'])
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  cognito_id: string;

  @Column()
  given_name: string;

  @Column()
  family_name: string;

  @Column({
    nullable: true,
  })
  middle_name: string;

  @Column()
  phone_number: string;

  @Column({
    nullable: true,
    default: null,
  })
  profile: string;

  @Column({
    type: 'enum',
    enum: USER_GENDER_ENUM,
    nullable: true,
    default: USER_GENDER_ENUM.OTHERS,
  })
  gender: string;

  @Column()
  birthdate: string;

  @Column()
  address: string;
}
