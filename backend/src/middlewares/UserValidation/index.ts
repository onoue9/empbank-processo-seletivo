import { userRegisterSchema } from "./RegisterSchema";
import UserRegisterValidation from './RegisterValidation';
import { loginSchema } from "./LoginSchema";
import LoginValidation from './LoginValidation';

export const userRegisterValidation = new UserRegisterValidation(userRegisterSchema);
export const loginValidation = new LoginValidation(loginSchema);
