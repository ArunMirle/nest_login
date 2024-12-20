// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './user.service';
import { UsersController } from './user.controller'; // Import the UsersController

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController], // Add the controller here
  exports: [UsersService],
})
export class UsersModule {}
