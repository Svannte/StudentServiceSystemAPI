import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mark } from '../modules/mark/entities/mark.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column()
  ECTS: number;

  @ManyToMany(() => Schedule, (schedule) => schedule.subjects)
  schedules: Schedule[];

  @OneToMany(() => Mark, (mark) => mark.subject)
  marks?: Mark[];
}
