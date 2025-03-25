import { Module } from '@nestjs/common';
import { MedicamentosService } from './services/medicamentos.service';
import { MedicamentosController } from './controllers/medicamentos.controller';

@Module({
  controllers: [MedicamentosController],
  providers: [MedicamentosService],
})
export class MedicamentosModule {}
