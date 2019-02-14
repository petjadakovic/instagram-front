import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatAutocompleteSelectedEvent, MatOptionSelectionChange } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HeaderService } from './header.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { homedir } from 'os';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public headerService: HeaderService, private router: Router) {}

  dialogRef: any;
  myControl = new FormControl();
  options = [];

  image_url = environment.server_url + "users/photo-circle?id=";

  ngOnInit() {
 
  }

  onEmailChange(){
   
  }

  public onSearchChange(str: string): void {
    if(str.length > 0){
      this.headerService.getUsersLike(str).subscribe(res=>{
        console.log(res);
        if(res.status == 200) {
          this.options = <Array<any>>res.body;
        }
      }, err => {
        console.log(err);
      });
    } else{
      this.options = [];
    }
  }

  public openUser(user: any){
    this.router.navigate(['/user', user.id]);
  }

  public uploadPost(event){
    let file = <File>event.target.files[0];
    if (!file) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);
  
    this.headerService.uploadPost(formData).subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
         this.headerService.emitChange();
      }
    }, err => {
      console.log(err);
    });
   }
  

}
