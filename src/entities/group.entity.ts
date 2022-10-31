import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './department.entity';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';

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
