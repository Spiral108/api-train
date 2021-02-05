import { Response } from 'express';
import { HTTPStatus } from '../types';

type HTTPStatusCode = HTTPStatus;

export default class ApiResponse {
  protected isSuccess: boolean;
  protected statusCode: HTTPStatusCode;
  protected message: string;
  protected theResObj: Response;
  protected data: any;

  constructor(res: Response) {
    this.theResObj = res;
    this.statusCode = 200;
    this.isSuccess = true;
    this.message = '';
    this.data = {};
  }
  setSuccess(isSuccess: boolean): ApiResponse {
    this.isSuccess = isSuccess;
    return this;
  }
  setStatus(statusCode: HTTPStatusCode): ApiResponse {
    this.statusCode = statusCode;
    if (statusCode !== HTTPStatus.OK) {
      this.isSuccess = false;
    }
    return this;
  }
  setMsg(message: string): ApiResponse {
    this.message = message;
    return this;
  }
  setData(identifier: string, data: any): ApiResponse {
    this.data[identifier] = data;
    return this;
  }
  send() {
    const { theResObj, ...responseBody } = this;
    return this.theResObj
      .status(this.statusCode)
      .json({ ...responseBody })
      .end();
  }
}
export { HTTPStatus as HTTPStatusCode } from '../types';
