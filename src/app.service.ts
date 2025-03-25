import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Teste(): string {
    return 'Api Rodando!';
  }
}
