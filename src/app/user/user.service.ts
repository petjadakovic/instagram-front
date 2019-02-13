import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private server_url = environment.server_url;
  constructor(private http: HttpClient) { }

  public getProfilePicture(id: string){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/profile-photo/" + id, {headers: headers, observe: 'response'});
  }

  public getUserInfo(id: string){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/user-info/" + id, {headers: headers, observe: 'response'});
  }

  public follow(id: string){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/follow/" + id, {headers: headers, observe: 'response'});
  }

  public unFollow(id: string){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/unfollow/" + id, {headers: headers, observe: 'response'});
  }
}
