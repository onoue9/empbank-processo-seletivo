import UserModel from "./UserModel";
import UserInterface from "./UserInterface";

export default class UserService {

  private UserModel: UserModel;

  constructor() {
    this.UserModel = new UserModel();
  }

  async getAllUsers(): Promise<UserInterface[]> {
    const allUsers = await this.UserModel.getAllUsers();

    if (!allUsers) {
      throw new Error("No users found");
    }
    
    return allUsers;
  }

  async getUser(user: UserInterface): Promise<UserInterface> {
    const foundUser = await this.UserModel.getUserById(user);

    if (!foundUser) {
      throw new Error("User not found");
    }

    return foundUser;
  }

  async loginUser(user: UserInterface) {
    const foundUser = await this.UserModel.loginUser(user);

    if (!foundUser) {
      throw new Error("User not found");
    }

    return foundUser;
  }

  async registerUser(user: UserInterface) {
    const emailRegex = /\S+@\S+\.\S+/;
    const { email } = user;

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email");
    }

    const createUser = await this.UserModel.createUser(user);

    if (!createUser) {
      throw new Error("User not created");
    }
    return createUser;
  }
}
