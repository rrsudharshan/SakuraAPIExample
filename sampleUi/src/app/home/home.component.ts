import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {
  public userData : any;
  constructor(private router: Router) {
    if (localStorage.getItem('userData')) {
      this.userData = localStorage.getItem('userData');
    } else {
      this
        .router
        .navigate(['']);
    }

  }

  ngOnInit() {}

  logout() {
    localStorage.setItem('userData', '');
    localStorage.clear();
    this.router.navigate(['']);
  }

}
