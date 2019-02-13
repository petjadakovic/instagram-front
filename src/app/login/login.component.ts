import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onLogIn(form: NgForm){
    const value = form.value;
    const email = value.email;
    const password = value.password;
    
    this.loginService.login(email, password).subscribe(
      (response) => this.login(response)
    );
    
  }

  login(response: any){
      console.log(response);
      localStorage.setItem('token', response.headers.get('Authorization'));

      console.log(" ls" + localStorage.getItem('token'));
      this.router.navigate(['/']);
  }
}
