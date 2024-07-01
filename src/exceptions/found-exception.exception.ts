import {HttpException, HttpStatus} from "@nestjs/common";

interface Error {
  message?: never;
  error?: never;
  createdAt?: never;
  [key: string]: string;
}

export class FoundException extends HttpException {
  constructor(error: Error = null) {
    super(
        {
          message: 'User with email already exists',
          error: 'found_exception',
          createdAt: new Date(),
          ... error
      },
      HttpStatus.FOUND,
    );
  }
}