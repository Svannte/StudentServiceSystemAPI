import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

enum roles {
  Unknow = 'UNKNOW',
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: roles, default: roles.Unknow })
  role: roles;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  hashed_password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @ManyToOne(() => Group, (group) => group.students, { nullable: true })
  group: Group;
}
