import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// database
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';

// controllers
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
