import jwt from 'express-jwt';
import { Users } from '../api/entities/User';

declare global {
  namespace Express {
    export interface Request {
      currentUser: Users;
      token: Token;
    }
  }
}

export type Token = jwt.Options;

export type Factory<Entity> = (data?: Entity) => Promise<Entity> | Entity;

export interface IUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserResponseDTO {
  user: Users;
  token: string;
}

export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export interface ApiResponseProps<T> {
  success: boolean;
  statusCode: HTTPStatus;
  message?: string;
  data?: T;
}
