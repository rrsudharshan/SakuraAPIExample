import {
  IRoutableLocals,
  SakuraApi
}                           from '@sakuraapi/api';
import {
  addAuthAudience,
  AuthAudience,
  IAuthAudienceOptions
}                           from '@sakuraapi/auth-audience/lib';
import {
  addAuthenticationAuthority,
  IAuthenticationAuthorityOptions
}                           from '@sakuraapi/auth-native-authority';
import {ICustomTokenResult} from '@sakuraapi/auth-native-authority/lib/src';
import {json}               from 'body-parser';
import * as cors            from 'cors';
import * as debugInit       from 'debug';
import {
  NextFunction,
  Request,
  Response
}                           from 'express';
import * as helmet          from 'helmet';

import {
  ConfigApi
}                           from './api/config.api';
import {
  SomeApi
}                           from './api/some-api';
import {BootstrapIndexes}   from './config/bootstrap/bootstrap-indexes';
import {dbs}                from './config/bootstrap/db';
import {SomeModel}               from './models/some-model';
import {LogService}         from './services/log-service';

const debug = debugInit('profile:sakuraApi');

export class Bootstrap {
  private log: LogService;
  private sapi: SakuraApi;
  private shuttingDown = false;

  async boot(): Promise<SakuraApi> {
    debug('bootstrapping Profile Server');

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    // SakuraApi instance for server
    this.sapi = new SakuraApi({
      baseUrl: '/api',
      models: [
        SomeModel
      ],
      plugins: [
        {
          options: this.authNativeAuthorityOptions(),
          plugin: addAuthenticationAuthority
        },
        {
          options: this.authAudienceOptions(),
          order: 1,
          plugin: addAuthAudience
        }
      ],
      providers: [
        LogService
      ],
      routables: [
        ConfigApi,
        SomeApi
      ]
    });

    this.log = this.sapi.getProvider(LogService);

    debug('configuring email services');

    debug('adding middleware');
    // SakuraApi setup
    this.sapi.addMiddleware(cors(this.sapi.config.cors));
    this.sapi.addMiddleware(helmet());
    this.sapi.addMiddleware(json());

    // smtpTransport = createTransport(this.sapi.config.smtp);

    // Add debug tracing
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

    await this.sapi.dbConnections.connectAll();

    // bootstrap test data when testing
    // make sure MongoDB indexes are setup
    debug('bootstrapping indexes');
    wait.push(await new BootstrapIndexes(this.sapi).run());

    await Promise.all(wait);

    process.once('SIGINT', () => this.shutdownServer.call(this, 'SIGINT'));
    process.once('SIGTERM', () => this.shutdownServer.call(this, 'SIGTERM'));
    process.once('SIGUSR1', () => this.shutdownServer.call(this, 'SIGUSR1'));
    process.once('SIGUSR2', () => this.shutdownServer.call(this, 'SIGUSR2'));

    debug('bootstrap done');
    return this.sapi;

  }

  authNativeAuthorityOptions(): IAuthenticationAuthorityOptions {
    console.log('authsss....');
    return {
      authDbConfig: dbs.authentication,
      authenticator: AuthAudience,
      defaultDomain: 'default',
      endpoints: {create: 'users'},
      onBeforeUserCreate: this.onBeforeUserCreate.bind(this),
      onChangePasswordEmailRequest: this.onChangePasswordEmailRequest.bind(this),
      onForgotPasswordEmailRequest: this.onForgotPasswordEmailRequest.bind(this),
      onInjectCustomToken,
      onLoginSuccess: this.onLoginSuccess.bind(this),
      onResendEmailConfirmation: this.onResendEmailConfirmation.bind(this),
      onUserCreated: this.onUserCreated.bind(this),
      userDbConfig: dbs.configdatabase
    };
  }

  authAudienceOptions(): IAuthAudienceOptions {
    return {};
  }

  async onBeforeUserCreate(req: Request, res: Response, next: NextFunction) {
    console.log('onBeforeUserCreate called');
    next();
  }

  async onChangePasswordEmailRequest(user: any, req: Request, res: Response): Promise<void> {
    console.log('onChangePasswordEmailRequest');
  }

  async onForgotPasswordEmailRequest(user: any, token: string, req: Request, res: Response): Promise<any> {
    console.log('onForgotPasswordEmailRequest');
  }

  async onLoginSuccess(user: any, jwt: any, sa: SakuraApi, req: Request, res: Response): Promise<void> {
    console.log('onForgotPasswordEmailRequest');
  }

  async onResendEmailConfirmation(user: any, token: string, req: Request, res: Response): Promise<void> {
    console.log(token);
    console.log('onResendEmailConfirmation');
  }

  async onUserCreated(user: any, token: string, req: Request, res: Response): Promise<void> {
    console.log(token);
    console.log('onResendEmailConfirmation');

    // remember, this is not called during tests. Testing uses its own instance of SakuraApi
    // that has its own configuration
  }

  async onUserCreatedSendWelcomeEmail(user: any, token: string, req: Request, res: Response): Promise<void> {

  }

  async shutdownServer(signal: string): Promise<void> {
    debug(`shutdownServer called by ${signal}`);

    if (this.shuttingDown) {
      return;
    }

    this.shuttingDown = true;

    this.log.info(`Shutting down Donation Server (signal: ${signal})`);

    await this.sapi
      .close()
      .catch((err) => this.log.error('Unable to shutdown SakuraApi', err));

    this.log.info('And now his watch is ended');
    process.exit(0);
  }
}

export function onInjectCustomToken(token: any, key: string, issuer: string,
                                    expiration: string, payload: any, jwtId: string): Promise<ICustomTokenResult[]> {

  debug('onInjectCustomToken called');

  // NOTE THERE IS A DEPENDENCY PROBLEM THAT'S PREVENTING THIS FROM BEING LOADED FROM THE CONFIG
  // THIS COMMIT IS HAPPENING TO GET SOME TESTING DONE, THEN THAT ISSUE WILL BE RESOLVED, See TSCILB-172
  return Promise.resolve([{
    audience: 'score.seedconnect.com',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTgwOGJkNmQ4MTBjMGFjNGQ4OGFkYTQ1IiwiYXBpU2VjcmV0I' +
    'joiOGM1YmRhMDktOWI5MS02OGQ0LTk5OTMtZTA3YzNkMzQ1ZTYyIiwiaWF0IjoxNTAwOTE3MjE3fQ.iuxACmlvfevrZo5ja9ugRxkIwcb' +
    '8FSi32zcX8kcOC_8'
  }]);
}
