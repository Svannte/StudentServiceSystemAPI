import { Module, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Department } from '../department/entities/department.entity';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, Department, User]),
    RouterModule.register([
      { path: 'department/:departmentId', module: GroupModule },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
