import {
  IDbGetParams,
  IFromDbOptions,
  Model,
  SakuraApi,
  SapiModelMixin,
  Db,
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

import {dbs} from '../config/bootstrap/db';

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
  dbConfig: dbs.configdatabase
})
export class SomeModel extends SapiModelMixin() {

  @Db({field: 'fn'}) @Json()
  firstName: string;

  @Db({field: 'ln'}) @Json()
  lastName: string;

  @Db({field: 'pw', private: true}) @Json()
  password: string;

  @Db({field: 'pwHash'}) @Json()
  passwordResetHash: string;
}
