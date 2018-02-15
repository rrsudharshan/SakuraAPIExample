"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
class BootstrapIndexes {
    constructor(sapi) {
        this.sapi = sapi;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const userDb = this.sapi.dbConnections.getDb(db_1.dbs.configdatabase.db);
                const authDb = this.sapi.dbConnections.getDb(db_1.dbs.authentication.db);
                const wait = [];
                wait.push(userDb.createIndex(db_1.dbs.configdatabase.collection, { email: 1, domain: 1 }, { unique: true }));
                wait.push(authDb.createIndex(db_1.dbs.authentication.collection, { uid: 1, jti: 1 }));
                wait.push(authDb.createIndex(db_1.dbs.authentication.collection, { created: 1 }, { expireAfterSeconds: 172800 }));
                Promise
                    .all(wait)
                    .then(resolve)
                    .catch(reject);
            });
        });
    }
}
exports.BootstrapIndexes = BootstrapIndexes;
//# sourceMappingURL=bootstrap-indexes.js.map