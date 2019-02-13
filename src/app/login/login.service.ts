import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private server_url = environment.server_url;
  constructor(private http: HttpClient) { }

  public login(email: string, password: string){
    let headers123 = new HttpHeaders().set('content-type', 'multipart/form-data')
    return this.http.post(this.server_url + "login",{email, password }, {observe: 'response', headers: headers123});
  }
}
