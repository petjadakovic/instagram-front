import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from './profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {



  constructor(private profileService: ProfileService) { }
  
  imgSrc = "";
  
  ngOnInit() {
    this.setProfilePic();
  }

  setProfilePic(): void {
    this.profileService.getProfilePicture().subscribe(res =>{
      if(res.status == 200) {
       this.imgSrc = environment.server_url + 'users/photo?id=' + res.body['id'];
      }
    }, err => {
      console.log(err);
    });
  }

  changeEmail(form: NgForm): void {
   // console.log(form.value.email);
    this.profileService.changeEmail(form.value.email).subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
        console.log("new token " + res.body["token"]);
        localStorage.setItem('token',res.body["token"]);
      }
    }, err => {
      console.log(err);
    });
  }

  changePassword(form: NgForm): void {
    // console.log(form.value.email);
     this.profileService.changePassword(form.value.password).subscribe(res=>{
       console.log(res);
       if(res.status == 200) {
       }
     }, err => {
       console.log(err);
     });
   }

   setFiles(event){
    let file = <File>event.target.files[0];
    if (!file) {
      return
    }

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);
  
    this.profileService.uploadPhoto(formData).subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
        this.setProfilePic();
      }
    }, err => {
      console.log(err);
    });
   }

   
}
