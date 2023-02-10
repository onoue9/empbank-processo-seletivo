import { PrismaClient } from '@prisma/client';
import UserInterface from './UserInterface';

const prisma = new PrismaClient();

export default class UserModel {

  async getAllUsers(): Promise<UserInterface[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  async getUserById(user: UserInterface): Promise<UserInterface | null> {
    const { email } = user;
    const getUser = await prisma.user.findUnique({
      where: {
        email: email,
      }
    });
    return getUser;
  }

  async loginUser(user: UserInterface): Promise<UserInterface | null> {
    const { email, password } = user;
    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      }
    })
    return foundUser;
  }

  async createUser(user: UserInterface): Promise<UserInterface> {
    const newUser = await prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      }
    })
    return newUser;
  }
}
