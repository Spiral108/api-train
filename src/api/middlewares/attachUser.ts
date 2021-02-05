import { Container } from 'typedi';
import { Logger } from 'winston';
import { Response, NextFunction, Request } from 'express';
import { Users } from '../entities/User';
import UserService from '../services/UserService';

const attachUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  const logger: Logger = Container.get('logger');
  try {
    const userService = Container.get(UserService);
    const userEntity: Users = await userService.findOne(req.token.id);
    if (!userEntity) {
      return res.sendStatus(401);
    }
    req.currentUser = userEntity;
    return next();
  } catch (e) {
    logger.error('Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachUser;
