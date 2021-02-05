import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import { isAuth, attachUser, checkRole } from '../middlewares';
import UserService from '../services/UserService';
import ApiResponse, { HTTPStatusCode } from '../../helpers/ApiResponse';

const route = Router();

route.get(
  '/',
  isAuth,
  checkRole('admin'),
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /user endpoint');
    try {
      const userServiceInstance = Container.get(UserService);
      const users = await userServiceInstance.find();
      return new ApiResponse(res).setData('users', users).send();
      // return res.json(users).status(200);
    } catch (e) {
      return next(e);
    }
  }
);

route.get('/current', isAuth, attachUser, (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling GET /user/current endpoint');
  return new ApiResponse(res).setData('user', req.currentUser).send();
});

route.patch(
  '/:id',
  celebrate({
    body: Joi.object({
      email: Joi.string().email(),
      firstName: Joi.string().max(32),
      lastName: Joi.string().max(32),
      role: Joi.string().valid('user', 'admin'),
    }),
  }),
  isAuth,
  attachUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling PUT /user/ endpoint');
    try {
      const userServiceInstance = Container.get(UserService);
      const { id } = req.params;
      const user = await userServiceInstance.findOne(id);
      if (!user) {
        return new ApiResponse(res)
          .setStatus(HTTPStatusCode.NOT_FOUND)
          .setMsg('user not found')
          .send();
      }
      const updated = await userServiceInstance.update(id, req.body);
      if (!updated) {
        return new ApiResponse(res)
          .setStatus(HTTPStatusCode.INTERNAL_SERVER_ERROR)
          .send();
      }
      const newUser = await userServiceInstance.findOne(id);
      return new ApiResponse(res)
        .setData('user', newUser)
        .setStatus(HTTPStatusCode.OK)
        .send();
    } catch (e) {
      return next(e);
    }
  }
);

route.delete(
  '/:id',
  celebrate({
    body: Joi.object({}),
  }),
  isAuth,
  attachUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling DELETE /user/ endpoint');
    try {
      const userServiceInstance = Container.get(UserService);
      const { id } = req.params;
      const user = await userServiceInstance.findOne(id);
      if (!user) {
        // return res.json({ msg: 'user not found' }).status(400);
        return new ApiResponse(res)
          .setStatus(HTTPStatusCode.NOT_FOUND)
          .setMsg('user not found')
          .send();
      }
      await userServiceInstance.delete(id);
      // return res.json({ success: true }).status(200);
      return new ApiResponse(res).send();
    } catch (e) {
      return next(e);
    }
  }
);
export default route;
