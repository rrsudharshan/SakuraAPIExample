import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
const apiUrl = 'http://localhost:3000/api/users/save';
@Injectable()
export class AuthService {

  constructor(public http : Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials) {
      console.log(credentials);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this
        .http
        .post(apiUrl , credentials, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }

}
