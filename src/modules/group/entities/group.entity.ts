import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { User } from '../../user/entities/user.entity';
import { Schedule } from '../../../entities/schedule.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.groups, {
    nullable: true,
  })
  department: Department;

  @ManyToMany(() => Schedule, (schedule) => schedule.groups)
  schedules: Schedule[];

  @OneToMany(() => User, (user) => user.group)
  students?: User[];
}
