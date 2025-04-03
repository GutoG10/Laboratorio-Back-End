import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infrastructure/infra.module';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from 'src/app/application.module';

@Module({
  imports: [
    //DATABASE CONFIG
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    //Modules
    InfraModule,
    PresentationModule,
    ApplicationModule,
  ],
})
export class AppModule {}
