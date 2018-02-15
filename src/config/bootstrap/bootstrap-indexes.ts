/**
 * Uncomment and place your indexes here if you'd like your server to verify indexes on start
 */
import {SakuraApi} from '@sakuraapi/api';

import {dbs} from './db';

export class BootstrapIndexes {

  constructor(private sapi: SakuraApi) {
  }

  async run() {
    // const testDb = this.sapi.dbConnections.getDb(dbs.test.db);
    //
    // await testDb
    //   .createIndex(dbs.test.collection, {
    //     chargeId: 1
    //   });

    return new Promise((resolve, reject) => {
      const userDb = this.sapi.dbConnections.getDb(dbs.configdatabase.db);
      const authDb = this.sapi.dbConnections.getDb(dbs.authentication.db);

      const wait = [];

      // user.users
      wait.push(userDb.createIndex(dbs.configdatabase.collection, {email: 1, domain: 1}, {unique: true}));

      // user.authentication
      wait.push(authDb.createIndex(dbs.authentication.collection, {uid: 1, jti: 1}));
      wait.push(authDb.createIndex(dbs.authentication.collection, {created: 1}, {expireAfterSeconds: 172800})); // 48h

      Promise
        .all(wait)
        .then(resolve)
        .catch(reject);
    });

  }
}
