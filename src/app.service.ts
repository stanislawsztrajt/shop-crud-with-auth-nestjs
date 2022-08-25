import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomePage(): string {
    return 'Welcome to my api, check endpoints: /api/products or /api/users or /api/auth';
  }
}
