import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Find a user by username
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  // Find a user by ID
  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).select('-password').exec();  // Exclude password
  }

  // Create a new user (registration)
  async createUser(
    username: string,
    password: string,
    email: string,
    phoneNumber?: string,
    age?: number,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      age,
      permissions:[{
        name:'test',
        action:'read',
        subject:'invoice'
      }]
    });
    return newUser.save(); // Save the user in MongoDB
  }

  // Validate a user's credentials during login
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Return the user if credentials match
    }
    return null;
  }
}
