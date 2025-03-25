import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicamentosModule } from './medicamentos/medicamentos.module';

@Module({
  imports: [MedicamentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
