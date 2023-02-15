import UserModel from "./UserModel";
import UserInterface from "./UserInterface";
import CustomError from "../../utils/CustomError";

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
  
  async getUser(userId: number): Promise<UserInterface> {
    const foundUser = await this.UserModel.getUserById(userId);
    
    if (!foundUser) {
      throw new Error("User not found");
    }
    
    return foundUser;
  }
  
  async loginUser(user: UserInterface) {
    const foundUser = await this.UserModel.loginUser(user);

    if (!foundUser) {
      throw new CustomError(404, 'Usuário não encontrado');
    }

    return foundUser;
  }
  
  async registerUser(user: UserInterface) {    
    const validateUser = await this.UserModel.getAllUsers();
    
    if (validateUser.some((validUser) => user.email === validUser.email)) {
      throw new CustomError(400, 'Já existe um usuário com esse email');
    }

    const createUser = await this.UserModel.createUser(user);
    
    return createUser;
  }
}
