import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getInfo(): { version: string; project: string } {
    return { version: '1.0.1', project: 'music platform' };
  }
}
