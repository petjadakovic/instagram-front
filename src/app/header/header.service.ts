import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private server_url = environment.server_url;
  constructor(private http: HttpClient) { }
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  public getUsersLike(username: string){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "users/like?username=" + username, {headers: headers, observe: 'response'});
  }

  public uploadPost(photo: FormData){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });

    return this.http.post(this.server_url + "posts/upload",photo, {headers: headers, observe: 'response'});
  }

  public emitChange(){
    this.change.emit(true);
  }
  
}
