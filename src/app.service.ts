import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWellcome(): string {
    return 'Alive!';
  }
}
