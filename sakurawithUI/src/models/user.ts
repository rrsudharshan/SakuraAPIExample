import {
  Db,
  IDbGetParams,
  IFromDbOptions,
  Model,
  SakuraApi,
  SapiModelMixin,
  Json
} from '@sakuraapi/api';
import {
  Collection,
  CollectionInsertOneOptions,
  CollectionOptions,
  Cursor,
  Db as MongoDb,
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  ObjectID,
  ReplaceOneOptions,
  UpdateWriteOpResult
} from 'mongodb';
import { dbs } from '../config/bootstrap/db';

export {
  Collection,
  CollectionInsertOneOptions,
  CollectionOptions,
  Cursor,
  MongoDb,
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  ObjectID,
  ReplaceOneOptions,
  UpdateWriteOpResult,
  IDbGetParams,
  IFromDbOptions,
  SakuraApi
};

@Model({
  dbConfig : dbs.user

})
export class User extends SapiModelMixin() {
  @Db({field: 'name'}) @Json()
    name: string;
  // @Db({field: 'email'}) @Json()
  //   email: string
  // @Db({field: 'password'}) @Json()
  //   password: string
  // @Db({field: 'phone'}) @Json()
  //   phone: number;

}
