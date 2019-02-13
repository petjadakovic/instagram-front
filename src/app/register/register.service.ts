import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private server_url = environment.server_url;

  constructor(private http: HttpClient) { }

  public isUsernameTaken(username: string){
    let params = new HttpParams().set("username", username);
    return this.http.get(this.server_url + "users/check-username",{params : params });
  }

  public isEmailTaken(email: string){
    let params = new HttpParams().set("email", email);
    return this.http.get(this.server_url + "users/check-email",{params : params });
  }
  
  public register(email: string, username: string, password: string){
    return this.http.post(this.server_url + "users/register",{email, username, password });
  }
}
