import { Module, ParseIntPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentService], //{ provide: APP_PIPE, useClass: ParseIntPipe }],
  controllers: [DepartmentController],
  exports: [DepartmentService],
})
export class DepartmentModule {}
