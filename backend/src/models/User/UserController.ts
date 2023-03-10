import UserService from './UserService';
import { Request, Response } from 'express';

export default class UserController {

  private UserService: UserService;

  constructor() {
    this.UserService = new UserService();
  }

  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const allUsers = await this.UserService.getAllUsers();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    try {
      const user = await this.UserService.getUser(parseFloat(userId));
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const foundUser = await this.UserService.loginUser({ email, password });
      return res.status(200).json(foundUser);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async registerUser(req: Request, res: Response): Promise<Response> {
    const { fullName, email, password } = req.body;
    try {
      const newUser = await this.UserService.registerUser({ fullName, email, password });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
