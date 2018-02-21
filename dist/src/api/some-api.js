"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@sakuraapi/api");
exports.SakuraApi = api_1.SakuraApi;
const bcrypt_1 = require("bcrypt");
const crypto = require("crypto");
const some_model_1 = require("../models/some-model");
const db_1 = require("../config/bootstrap/db");
let SomeApi = class SomeApi extends api_1.SapiRoutableMixin() {
    someRoute(req, res, next) {
        const resLocals = res.locals;
        resLocals.send(200, { message: 'welcome to my world' });
        next();
    }
    registerRoute(req, res, next) {
        const resLocals = res.locals;
        const userDb = this.sapi.dbConnections.getDb(db_1.dbs.configdatabase.db);
        const userCol = userDb.collection(db_1.dbs.configdatabase.collection);
        userCol.findOne({ email: resLocals.reqBody.email }).then((result) => {
            if (result) {
                return;
            }
            const obj = {
                email: resLocals.reqBody.email,
                password: resLocals.reqBody.password
            };
            const password = obj.pw || crypto.randomBytes(6).toString('base64');
            const hashRounds = (((this.sapi.config || {}).authentication || {}).native
                || {}).bcryptHashRounds || 12;
            bcrypt_1.hash(password, hashRounds)
                .then((pw) => {
                obj.pw = pw;
                userCol
                    .insertOne(obj)
                    .then(() => {
                    resLocals.send(200, { message: 'User created' });
                });
            });
        });
        next();
    }
};
__decorate([
    api_1.Route({
        method: 'get',
        path: '/details'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], SomeApi.prototype, "someRoute", null);
__decorate([
    api_1.Route({
        method: 'post',
        path: '/register'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], SomeApi.prototype, "registerRoute", null);
SomeApi = __decorate([
    api_1.Routable({
        baseUrl: 'users',
        model: some_model_1.SomeModel,
        suppressApi: true
    })
], SomeApi);
exports.SomeApi = SomeApi;
//# sourceMappingURL=some-api.js.map