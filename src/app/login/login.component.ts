import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public login: Login;

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) { 
    this.login = new Login();
  }

  ngOnInit() {
  }

  submit(login: Login): void {
    this.loginService.signin(login)
    .subscribe((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.toastr.success('Login', 'Signed successfully.');
        this.router.navigate(['dashboard']);
      },
      err => {
        this.toastr.error('Login', 'User not found!');
      });
  }

}
