import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './lib/config/ormconfig';
import { Department } from './entities/department.entity';
import { Group } from './entities/group.entity';
import { User } from './entities/user.entity';
import { Mark } from './entities/mark.entity';
import { Schedule } from './entities/schedule.entity';
import { Subject } from './entities/subject.entity';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Department,
      Group,
      Mark,
      Schedule,
      Subject,
      User,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
