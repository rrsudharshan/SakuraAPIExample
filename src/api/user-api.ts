import {
  Routable,
  Route,
  SakuraApi,
  SapiRoutableMixin,
  IRoutableLocals
} from '@sakuraapi/api';
import {
  NextFunction,
  Request,
  Response
} from 'express';

import {LogService} from '../services/log-service';
import { UserModel } from '../models/user-model';

export { SakuraApi };

@Routable({
  baseUrl:'users',
  model:UserModel
})
export class UserApi extends SapiRoutableMixin() {
  constructor(private logService:LogService) {
    super();
  }
  @Route({
    method: 'get',
    path: '/usersData'
  })
  getUsers(req: Request, res: Response,next :NextFunction) {
    console.log('coming to getusers');
    const custRes = res.locals as IRoutableLocals;
    custRes.send(200 , {msg : 'Hello World', error : 'No error'});
    next();
    }

  @Route({
    method: 'post',
    path: '/saveUser'
  })
  saveUser(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const user = req.body.name;
    this.logService.info('savingUser',user);
    const custRes = res.locals as IRoutableLocals;
    custRes.send(200 ,{msg:'this is checking post data from '+ req.body.name,error:'No error'});
    next();
    
  }
}
