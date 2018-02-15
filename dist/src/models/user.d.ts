import { IDbGetParams, IFromDbOptions, SakuraApi } from '@sakuraapi/api';
import { Collection, CollectionInsertOneOptions, CollectionOptions, Cursor, Db as MongoDb, DeleteWriteOpResultObject, InsertOneWriteOpResult, ObjectID, ReplaceOneOptions, UpdateWriteOpResult } from 'mongodb';
export { Collection, CollectionInsertOneOptions, CollectionOptions, Cursor, MongoDb, DeleteWriteOpResultObject, InsertOneWriteOpResult, ObjectID, ReplaceOneOptions, UpdateWriteOpResult, IDbGetParams, IFromDbOptions, SakuraApi };
export declare class User extends {
    _id: ObjectID;
    id: ObjectID;
    create: (options?: CollectionInsertOneOptions) => Promise<InsertOneWriteOpResult>;
    getCollection: () => Collection<any>;
    getDb: () => MongoDb;
    remove: (filter: any, options?: CollectionOptions) => Promise<DeleteWriteOpResultObject>;
    save: (set?: {
        [key: string]: any;
    }, options?: ReplaceOneOptions) => Promise<UpdateWriteOpResult>;
    toDb: (changeSet?: object) => any;
    toJson: (projection?: any) => any;
    toJsonString: (replacer?: () => any, space?: string | number) => string;
} {
    name: string;
}
