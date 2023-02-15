import { NextFunction, Request, Response } from 'express';
import CustomError from '../../utils/CustomError';

export default class ErrorHandler {
  private defaultStatus: number;
  constructor(defaultStatus = 500) {
    this.defaultStatus = defaultStatus;
  }

  handleError(error: CustomError, _req: Request, res: Response, _next: NextFunction) {
    const errorStatus = error.status ||  this.defaultStatus;

    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(errorStatus).json({ error });
  }
}