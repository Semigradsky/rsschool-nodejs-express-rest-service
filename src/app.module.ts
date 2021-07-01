import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmModule } from './db';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    typeOrmModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
