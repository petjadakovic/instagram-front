import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private server_url = environment.server_url;
  constructor(private http: HttpClient) { }

  public changeEmail(email: string){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.post(this.server_url + "users/change-email",{email}, {headers: headers, observe: 'response'});
  }

  public changePassword(password: string){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.post(this.server_url + "users/change-password",{password}, {headers: headers, observe: 'response'});
  }

  public uploadPhoto(photo: FormData){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
      //'content-type': 'multipart/form-data'
    });
   // return this.http.post(this.server_url + "users/upload",{photo}, { observe: 'response'});
    return this.http.post(this.server_url + "users/upload-profile",photo, {headers: headers, observe: 'response'});
  }

  public getProfilePicture(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/profile-photo", {headers: headers, observe: 'response'});
  }
}
