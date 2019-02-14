import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import {FormControl} from "@angular/forms";
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private headerService: HeaderService, private router: Router) {}

  myControl = new FormControl();

  posts = [];

  stories = [];

  server_ulr = environment.server_url;

  page = 0;


  ngOnInit() {
    this.getPosts();
    this.getStories();
    this.headerService.change.subscribe(change =>{
      this.posts = [];
      this.getPosts();
    });
  }
 
  public getPosts(): void {
      if(this.posts.length > 0){
        this.page = this.posts.length / 5;
      } else{
        this.page = 0;
      }
      this.homeService.getPosts(this.page).subscribe(res=>{
        console.log(res);
        if(res.status == 200) {
            for(let post of <Array<any>>res.body){
                if(!this.isPostLoaded(post)){
                  this.posts.push(post);
                }
            }
        }
      }, err => {
        console.log(err);
      });
    }
    
    public getPostPhotoUrl(id:string){
        return this.server_ulr + "users/photo?id=" + id;
    }

    public getCirclePhotoUrl(id:string){
      return this.server_ulr + "users/photo-circle?id=" + id;
    }

    public like(post){
      this.homeService.like(post.id).subscribe(res=>{
        console.log(res);
        if(res.status == 200) {
            post.i_like = res.body['like'];
            post.like_count = res.body['like_count'];
        }
      }, err => {
        console.log(err);
      });
    }

    public unlike(post){
      this.homeService.unlike(post.id).subscribe(res=>{
        console.log(res);
        if(res.status == 200) {
          post.i_like = res.body['like'];
          post.like_count = res.body['like_count'];
        }
      }, err => {
        console.log(err);
      });
    }

    public share(post){
      this.homeService.share(post.id).subscribe(res=>{
        console.log(res);
        if(res.status == 200) {
            this.posts = [];
            this.getPosts();
        }
      }, err => {
        console.log(err);
      });
    }

    public isPostLoaded(post){
        for(let p of this.posts){
          if(post.id == p.id) return true;
        }
        return false;
    }

    @HostListener("window:scroll", ["$event"])
onWindowScroll() {
//In chrome and some browser scroll is given to body tag
let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
let max = document.documentElement.scrollHeight;
// pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
 if(pos == max && this.posts.length % 5 == 0)   {
    this.getPosts();
 }
}

onKeydown(event, post) {
  if (event.key === "Enter") {
    let comment = event.target.value;
    if(comment.length == 0)return;
    this.homeService.addComment(post.id, comment).subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
        event.target.value = "";
        post.comments = res.body['comments'];
      }
    }, err => {
      console.log(err);
    });
  }
}

public openUser(user: any){
  this.router.navigate(['/user', user.id]);
}

public uploadStory(event){
  let file = <File>event.target.files[0];
  if (!file) {
    return;
  }

  const formData: FormData = new FormData();
  formData.append('photo', file, file.name);

  this.homeService.uploadStory(formData).subscribe(res=>{
    console.log(res);
    if(res.status == 200) {
      console.log(res.body);
    }
  }, err => {
    console.log(err);
  });
 }

 public getStories(){
  this.homeService.getStories().subscribe(res=>{
    console.log(res);
    if(res.status == 200) {
      console.log(res.body);
      this.stories = <Array<any>>res.body;
    }
  }, err => {
    console.log(err);
  });
 }

 public openStory(user){
  this.router.navigate(['/story', user.id]);
 }

}

