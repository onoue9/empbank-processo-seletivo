import { NextFunction, Request, Response } from 'express';
import nodeTest from 'node:test';
import CustomError from '../../utils/CustomError';
import { loginSchema } from './LoginSchema';

export default class LoginValidation {
  schema: any;
  constructor(schema = loginSchema) {
    this.schema = schema;
  }

  validate(req: Request, _res: Response, next: NextFunction) {
    const request = req.body;

    const result = this.schema.safeParse(request);

    if (result.success) return next();

    const { issues: [{ message }]} = result.error;

    throw new CustomError(400, message);
  }
}
