import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Subject } from '../../../entities/subject.entity';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  dateOfIssue: Date;

  @Column()
  subjectName: string;

  @Column()
  markValue: number;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.group, { nullable: true })
  user: User;

  @ManyToOne(() => Subject, (subject) => subject.marks, { nullable: true })
  subject: Subject;
}
