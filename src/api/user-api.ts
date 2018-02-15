import {
  Routable,
  Route,
  SakuraApi,
  SapiRoutableMixin
} from '@sakuraapi/api';
import {
  NextFunction,
  Request,
  Response
} from 'express';

import { User } from '../models/user';

export { SakuraApi };

@Routable({
  baseUrl: 'users',
  model: User,
  suppressApi: true
})
export class UserApi extends SapiRoutableMixin() {

  // @Route({
  //   method: 'get',
  //   path: ':name'
  // })
  // getUsers(req: Request, res: Response, next: NextFunction) {
  //   res.send({data: req.params.name}).status(200);
  //   next();
  // }

  @Route({
    method: 'post',
    path: '/save'
  })
  async  sendUsers(req: Request, res: Response, next: NextFunction) {
    const user = User.fromJson(req.body);
    let u;
    try {
      u = await  user.create();
    } catch (err) {
      u = {message: err.message};
    }
    res.send(u).status(200);
  }

  @Route({
    method: 'get',
    path: '/getData'
  })
  async  getUsers(req: Request, res: Response, next: NextFunction) {
    let u;
    try {
      u = await  User.get({filter: {}});
    } catch (err) {
      u = {message: err.message};
    }
    res.send(u).status(200);
  }
  @Route({
    method: 'put',
    path: ':id'
  })
  async updateUser(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.id;
    const user = User.fromJson(req.body);
    let updateU;
    try {
      updateU = await user.save();
    } catch (err) {
      updateU = { message: err.message };
    }
    res.send(updateU).status(200);
    next();
  }

  @Route({
    method: 'delete',
    path: ':id'
  })
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    let updateU;
    try {
      updateU = await User.removeById(req.params.id);
    } catch (err) {
      updateU = { message: err.message };
    }
    res.send(updateU).status(200);
    next();
  }
}
