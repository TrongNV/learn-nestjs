import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(id: string): string {
    console.log(id)
    return 'Hello World!' + id;
  }
}
