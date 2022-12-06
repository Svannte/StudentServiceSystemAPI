import { Module, ParseIntPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './lib/config/ormconfig';
import { Department } from './modules/department/entities/department.entity';
import { Group } from './modules/group/entities/group.entity';
import { User } from './modules/user/entities/user.entity';
import { Mark } from './modules/mark/entities/mark.entity';
import { Schedule } from './entities/schedule.entity';
import { Subject } from './entities/subject.entity';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { DepartmentModule } from './modules/department/department.module';
import { GroupModule } from './modules/group/group.module';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { MarkModule } from './modules/mark/mark.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Schedule, Subject]),
    DepartmentModule,
    GroupModule,
    UserModule,
    MarkModule,
    AuthModule,
  ],
  controllers: [],
  //providers: [{ provide: APP_PIPE, useClass: ParseIntPipe }],
})
export class AppModule {}
