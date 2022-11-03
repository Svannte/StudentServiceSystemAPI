import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Group } from '../modules/group/entities/group.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  day: Date;

  @JoinTable()
  @ManyToMany(() => Subject, (subject) => subject.schedules, { cascade: true })
  subjects: Subject[];

  @JoinTable()
  @ManyToMany(() => Group, (group) => group.schedules, { cascade: true })
  groups: Group[];
}
