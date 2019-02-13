import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  username_taken: boolean = false;
  email_taken: boolean = false;
  passwords_match: boolean = true;
  register_success: boolean = false;

  constructor(private registerService: RegisterService) { }


  ngOnInit() {
    
  }

  onUsernameChange(){
    let username = this.registerForm.value.username;
    console.log(this.registerForm);
    if(username.length > 0){
      //console.log(this.registerService.isUsernameTaken(username));
      this.registerService.isUsernameTaken(username).subscribe(
        (response) => this.setUsernameTaken(!response['valid'])
      );
    }
  }

  onEmailChange(){
    console.log(this.registerForm);
    if(this.registerForm.controls['email'].valid){
      let email = this.registerForm.value.email;
      this.registerService.isEmailTaken(email).subscribe(
        (response) => this.setEmailTaken(!response['valid'])
      );
    } else{
      this.email_taken = false;
    }
  }

  onPasswordChange(){
    let password = this.registerForm.value.password;
    let confirm_password = this.registerForm.value.confirm_password;
    this.passwords_match = password == confirm_password;
  }
  

  setUsernameTaken(taken: boolean){
    this.username_taken = taken;
  }

  setEmailTaken(taken: boolean){
    this.email_taken = taken;
  }

  register(){
    let email = this.registerForm.value.email;
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;
    this.registerService.register(email, username, password).subscribe(
      (response) => this.setRegistrationSuccess(response['success'])
    );
  }

  setRegistrationSuccess(success: boolean){
    this.register_success = success;
  }

}
