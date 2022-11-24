import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";

export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(firstName: string, lastName: string, email: string, hashed_password: string) {
    const user = new this.userModel({firstName, lastName, email, hashed_password});
    const res = await user.save();
    return res
  }

  async findOne(email: string) {
    const user = await this.userModel.findOne({email: email});
    return user
  }
}