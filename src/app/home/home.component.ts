import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) {}

  myControl = new FormControl();

  dialogRef: any;

  posts = [];

  server_ulr = environment.server_url;

  ngOnInit() {
    this.getPosts();
  }
 
  public getPosts(): void {
      this.homeService.getPosts().subscribe(res=>{
        console.log(res);
        if(res.status == 200) {
            this.posts = <Array<any>>res.body;
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



}

