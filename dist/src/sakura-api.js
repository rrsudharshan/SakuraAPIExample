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
const api_1 = require("@sakuraapi/api");
const lib_1 = require("@sakuraapi/auth-audience/lib");
const auth_native_authority_1 = require("@sakuraapi/auth-native-authority");
const body_parser_1 = require("body-parser");
const cors = require("cors");
const debugInit = require("debug");
const helmet = require("helmet");
const config_api_1 = require("./api/config.api");
const some_api_1 = require("./api/some-api");
const bootstrap_indexes_1 = require("./config/bootstrap/bootstrap-indexes");
const db_1 = require("./config/bootstrap/db");
const some_model_1 = require("./models/some-model");
const log_service_1 = require("./services/log-service");
const debug = debugInit('profile:sakuraApi');
class Bootstrap {
    constructor() {
        this.shuttingDown = false;
    }
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('bootstrapping Profile Server');
            process.env.NODE_ENV = process.env.NODE_ENV || 'development';
            this.sapi = new api_1.SakuraApi({
                baseUrl: '/api',
                models: [
                    some_model_1.SomeModel
                ],
                plugins: [
                    {
                        options: this.authNativeAuthorityOptions(),
                        plugin: auth_native_authority_1.addAuthenticationAuthority
                    },
                    {
                        options: this.authAudienceOptions(),
                        order: 1,
                        plugin: lib_1.addAuthAudience
                    }
                ],
                providers: [
                    log_service_1.LogService
                ],
                routables: [
                    config_api_1.ConfigApi,
                    some_api_1.SomeApi
                ]
            });
            this.log = this.sapi.getProvider(log_service_1.LogService);
            debug('configuring email services');
            debug('adding middleware');
            this.sapi.addMiddleware(cors(this.sapi.config.cors));
            this.sapi.addMiddleware(helmet());
            this.sapi.addMiddleware(body_parser_1.json());
            if (this.sapi.config.TRACE_REQ === 'true') {
                this.sapi.addMiddleware((req, res, next) => {
                    this.log.info({
                        body: req.body,
                        method: req.method,
                        originalUrl: req.originalUrl,
                        url: req.url
                    });
                    next();
                });
            }
            const wait = [];
            yield this.sapi.dbConnections.connectAll();
            debug('bootstrapping indexes');
            wait.push(yield new bootstrap_indexes_1.BootstrapIndexes(this.sapi).run());
            yield Promise.all(wait);
            process.once('SIGINT', () => this.shutdownServer.call(this, 'SIGINT'));
            process.once('SIGTERM', () => this.shutdownServer.call(this, 'SIGTERM'));
            process.once('SIGUSR1', () => this.shutdownServer.call(this, 'SIGUSR1'));
            process.once('SIGUSR2', () => this.shutdownServer.call(this, 'SIGUSR2'));
            debug('bootstrap done');
            return this.sapi;
        });
    }
    authNativeAuthorityOptions() {
        console.log('authsss....');
        return {
            authDbConfig: db_1.dbs.authentication,
            authenticator: lib_1.AuthAudience,
            defaultDomain: 'default',
            endpoints: { create: 'users' },
            onBeforeUserCreate: this.onBeforeUserCreate.bind(this),
            onChangePasswordEmailRequest: this.onChangePasswordEmailRequest.bind(this),
            onForgotPasswordEmailRequest: this.onForgotPasswordEmailRequest.bind(this),
            onInjectCustomToken,
            onLoginSuccess: this.onLoginSuccess.bind(this),
            onResendEmailConfirmation: this.onResendEmailConfirmation.bind(this),
            onUserCreated: this.onUserCreated.bind(this),
            userDbConfig: db_1.dbs.configdatabase
        };
    }
    authAudienceOptions() {
        return {};
    }
    onBeforeUserCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('onBeforeUserCreate called');
            next();
        });
    }
    onChangePasswordEmailRequest(user, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('onChangePasswordEmailRequest');
        });
    }
    onForgotPasswordEmailRequest(user, token, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('onForgotPasswordEmailRequest');
        });
    }
    onLoginSuccess(user, jwt, sa, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('onForgotPasswordEmailRequest');
        });
    }
    onResendEmailConfirmation(user, token, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(token);
            console.log('onResendEmailConfirmation');
        });
    }
    onUserCreated(user, token, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(token);
            console.log('onResendEmailConfirmation');
        });
    }
    onUserCreatedSendWelcomeEmail(user, token, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    shutdownServer(signal) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`shutdownServer called by ${signal}`);
            if (this.shuttingDown) {
                return;
            }
            this.shuttingDown = true;
            this.log.info(`Shutting down Donation Server (signal: ${signal})`);
            yield this.sapi
                .close()
                .catch((err) => this.log.error('Unable to shutdown SakuraApi', err));
            this.log.info('And now his watch is ended');
            process.exit(0);
        });
    }
}
exports.Bootstrap = Bootstrap;
function onInjectCustomToken(token, key, issuer, expiration, payload, jwtId) {
    debug('onInjectCustomToken called');
    return Promise.resolve([{
            audience: 'score.seedconnect.com',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTgwOGJkNmQ4MTBjMGFjNGQ4OGFkYTQ1IiwiYXBpU2VjcmV0I' +
                'joiOGM1YmRhMDktOWI5MS02OGQ0LTk5OTMtZTA3YzNkMzQ1ZTYyIiwiaWF0IjoxNTAwOTE3MjE3fQ.iuxACmlvfevrZo5ja9ugRxkIwcb' +
                '8FSi32zcX8kcOC_8'
        }]);
}
exports.onInjectCustomToken = onInjectCustomToken;
//# sourceMappingURL=sakura-api.js.map