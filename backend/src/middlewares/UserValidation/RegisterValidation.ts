import { NextFunction, Request, Response } from 'express';
import CustomError from '../../utils/CustomError';
import { userRegisterSchema } from './RegisterSchema';

export default class UserResgisterValidation {
  private schema: any;
  constructor(schema = userRegisterSchema) {
    this.schema = schema;
  }

  validate(req: Request, _res: Response, next: NextFunction) {
    const request = req.body;

    const result = this.schema.safeParse(request);

    if (result.success) return next();

    const { issues: [{ message }] } = result.error;

    throw new CustomError(400, message);
  }
}