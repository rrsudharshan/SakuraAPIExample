import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: string;
  public googleUrl: any;
  public errorMsg: string;
  public responseData: any;
  public userPostData = {
    'name': ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.errorMsg = '';
    this.googleUrl = '';
  }
  emailValidate() {
      this.userPostData.name = this.name;
       console.log(this.userPostData);
       this.authService.postData(this.userPostData);

  }



}
