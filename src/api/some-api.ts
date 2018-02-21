import {
  Routable,
  Route,
  SakuraApi,
  SapiRoutableMixin,
  IRoutableLocals
} from '@sakuraapi/api';
import {AuthAudience}      from '@sakuraapi/auth-audience';
import {hash}       from 'bcrypt';
import * as crypto  from 'crypto';
import {
  NextFunction,
  Request,
  Response
} from 'express';
import {SomeModel} from '../models/some-model';
export {SakuraApi};
import {dbs}        from '../config/bootstrap/db';

@Routable({
  baseUrl: 'users',
  model: SomeModel,
  suppressApi: true
})
export class SomeApi extends SapiRoutableMixin() {

  @Route({
    method: 'get',
    path: '/details'
  })
  someRoute(req: Request, res: Response, next: NextFunction) {
    const resLocals = res.locals as IRoutableLocals;
    resLocals.send(200, {message: 'welcome to my world'});

    next();
  }

  @Route({
    method: 'post',
    path: '/register'
  })
  registerRoute(req: Request, res: Response, next: NextFunction) {

    const resLocals = res.locals as IRoutableLocals;
    const userDb = this.sapi.dbConnections.getDb(dbs.configdatabase.db);
    const userCol = userDb.collection(dbs.configdatabase.collection);

    userCol.findOne({email: resLocals.reqBody.email}).then((result) => {
      if (result) {
        return;
      }

      const obj: any = {
        email: resLocals.reqBody.email,
        password: resLocals.reqBody.password
      };
      const password = obj.pw || crypto.randomBytes(6).toString('base64');
      const hashRounds = (((this.sapi.config || {}  as any).authentication || {} as any).native
        || {} as any).bcryptHashRounds || 12;

      hash(password, hashRounds)
        .then((pw) => {
          obj.pw = pw;
          userCol
            .insertOne(obj)
            .then(() => {
              resLocals.send(200, {message: 'User created'});
            });
        });

    });
    next();
  }

}
