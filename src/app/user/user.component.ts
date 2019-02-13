import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private route: ActivatedRoute,private userService: UserService) { }

  id: string;
  private sub: any;
  imgSrc = "";
  user_info: any;

  username = "";
  followers = 0;
  following = 0;
  following_him = true;
  posts_count = 0;
  follow_btn = "";

  is_me= true;


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.setProfilePic();
      this.getUserInfo();
   });
  }

  setProfilePic(): void {
    this.userService.getProfilePicture(this.id).subscribe(res =>{
      if(res.status == 200) {
       this.imgSrc = environment.server_url + 'users/photo?id=' + res.body['id'];
      }
    }, err => {
      console.log(err);
    });
  }

  getUserInfo(): void {
    this.userService.getUserInfo(this.id).subscribe(res =>{
      if(res.status == 200) {
       console.log(res);
       this.user_info = res.body;
       this.username = this.user_info.username;
       this.followers = this.user_info.follow_count;
       this.following = this.user_info.following_count;
       this.posts_count = this.user_info.posts.length;
       this.following_him = this.user_info.following_him;
       this.is_me = this.user_info.is_me;
       if(this.following_him){
        this.follow_btn = "Unfollow";
       } else{
        this.follow_btn = "Follow";
       }
      }
    }, err => {
      console.log(err);
    });
  }

  follow(): void{
    if(this.following_him){
      this.userService.unFollow(this.id).subscribe(res =>{
        if(res.status == 200) {
         console.log(res.body['following']);
         this.following_him = res.body['following'];
         if(this.following_him){
          this.follow_btn = "Unfollow";
         } else{
          this.follow_btn = "Follow";
         }
         console.log(this.follow_btn);
        }
      }, err => {
        console.log(err);
      });
    } else{
      this.userService.follow(this.id).subscribe(res =>{
        if(res.status == 200) {
         console.log(res.body['following']);
         this.following_him = res.body['following'];
         if(this.following_him){
          this.follow_btn = "Unfollow";
         } else{
          this.follow_btn = "Follow";
         }
         console.log(this.follow_btn);
        }
      }, err => {
        console.log(err);
      });
    }
  }

}
