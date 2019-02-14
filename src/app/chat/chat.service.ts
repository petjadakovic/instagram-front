import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private server_url = environment.server_url;
  constructor(private http: HttpClient) { }

  public getId(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/get-id", {headers: headers, observe: 'response'});
  }

  public getFollowing(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/following", {headers: headers, observe: 'response'});
  }

  public getMessagesWith(id){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "messages/" + id, {headers: headers, observe: 'response'});
  }

  public sendMessage(to, body){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.post(this.server_url + "messages/send",{to, body} ,{headers: headers, observe: 'response'});
  }
}
