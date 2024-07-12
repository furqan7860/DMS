/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { login } from '../fn/user-controller/login';
import { Login$Params } from '../fn/user-controller/login';
import { signUp } from '../fn/user-controller/sign-up';
import { SignUp$Params } from '../fn/user-controller/sign-up';
import { User } from '../models/user';
import { whoAmI } from '../fn/user-controller/who-am-i';
import { WhoAmI$Params } from '../fn/user-controller/who-am-i';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userControllerSignUp()` */
  static readonly UserControllerSignUpPath = '/signup';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signUp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp$Response(params?: SignUp$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return signUp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `signUp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp(params?: SignUp$Params, context?: HttpContext): Observable<User> {
    return this.signUp$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userControllerLogin()` */
  static readonly UserControllerLoginPath = '/users/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'token'?: string;
}>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<{
'token'?: string;
}> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'token'?: string;
}>): {
'token'?: string;
} => r.body)
    );
  }

  /** Path part for operation `userControllerWhoAmI()` */
  static readonly UserControllerWhoAmIPath = '/whoAmI';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `whoAmI()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI$Response(params?: WhoAmI$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return whoAmI(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `whoAmI$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI(params?: WhoAmI$Params, context?: HttpContext): Observable<string> {
    return this.whoAmI$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
