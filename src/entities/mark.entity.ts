import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  dateOfIssue: Date;

  @Column()
  markValue: number;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.group, { nullable: true })
  user: User;

  @ManyToOne(() => Subject, (subject) => subject.marks, { nullable: true })
  subject: Subject;
}
