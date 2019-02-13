import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private server_url = environment.server_url;
  constructor(private http: HttpClient) { }

  public getPosts(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "posts/feed", {headers: headers, observe: 'response'});
  }
}
