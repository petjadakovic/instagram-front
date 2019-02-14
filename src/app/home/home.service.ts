import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private server_url = environment.server_url;
  constructor(private http: HttpClient) { }

  public getPosts(page){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "posts/feed?page=" + page, {headers: headers, observe: 'response'});
  }

  public like(id){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "posts/like/" + id, {headers: headers, observe: 'response'});
  }

  public unlike(id){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "posts/unlike/" + id, {headers: headers, observe: 'response'});
  }

  public share(id){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "posts/share/" + id, {headers: headers, observe: 'response'});
  }

  public addComment(id, comment){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.post(this.server_url + "posts/comment/" + id, comment, {headers: headers, observe: 'response'});
  }

  public uploadStory(photo: FormData){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });

    return this.http.post(this.server_url + "stories",photo, {headers: headers, observe: 'response'});
  }

  public getStories(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get(this.server_url + "stories", {headers: headers, observe: 'response'});
  }
}
