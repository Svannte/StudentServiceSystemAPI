//import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      migrationsTableName: 'migrations',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['src/**/**.entity{.ts, .js}'],
      migrations: ['src/lib/migrations/**/*{.ts, .js}'],
      subscribers: ['src/lib/subscriber/**/*{.ts,.js}'],
    };
  }
}
