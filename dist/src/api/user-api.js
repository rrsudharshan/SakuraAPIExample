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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@sakuraapi/api");
exports.SakuraApi = api_1.SakuraApi;
const user_1 = require("../models/user");
let UserApi = class UserApi extends api_1.SapiRoutableMixin() {
    sendUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_1.User.fromJson(req.body);
            let u;
            try {
                u = yield user.create();
            }
            catch (err) {
                u = { message: err.message };
            }
            res.send(u).status(200);
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let u;
            try {
                u = yield user_1.User.get({ filter: {} });
            }
            catch (err) {
                u = { message: err.message };
            }
            res.send(u).status(200);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.id;
            const user = user_1.User.fromJson(req.body);
            let updateU;
            try {
                updateU = yield user.save();
            }
            catch (err) {
                updateU = { message: err.message };
            }
            res.send(updateU).status(200);
            next();
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            let updateU;
            try {
                updateU = yield user_1.User.removeById(req.params.id);
            }
            catch (err) {
                updateU = { message: err.message };
            }
            res.send(updateU).status(200);
            next();
        });
    }
};
__decorate([
    api_1.Route({
        method: 'post',
        path: '/save'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "sendUsers", null);
__decorate([
    api_1.Route({
        method: 'get',
        path: '/getData'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "getUsers", null);
__decorate([
    api_1.Route({
        method: 'put',
        path: ':id'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "updateUser", null);
__decorate([
    api_1.Route({
        method: 'delete',
        path: ':id'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "deleteUser", null);
UserApi = __decorate([
    api_1.Routable({
        baseUrl: 'users',
        model: user_1.User,
        suppressApi: true
    })
], UserApi);
exports.UserApi = UserApi;
//# sourceMappingURL=user-api.js.map