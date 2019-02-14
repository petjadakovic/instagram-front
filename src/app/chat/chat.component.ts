import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  dialogRef: any;
  myControl = new FormControl();
  contacts = [];
  filtered = [];
  messages = [];
  selected;
  my_id;
  server_url = environment.server_url;

  constructor(public chatService: ChatService, private router: Router) {}

  ngOnInit() {
      this.getId();
      this.getFollowing();
  }

  onSearchChange($event){
    let str = event.target['value'];
    this.filtered = [];
    for(let user of this.contacts){
      if(user.username.includes(str)){
        this.filtered.push(user);
      }
    }
  }

  openChat(user){
    this.getMessages(user.id);
    this.selected = user;
  }

  getMessages(id){
    this.chatService.getMessagesWith(id).subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
        this.messages = (<Array<any>>res.body).reverse();
        this.scrollToBottom();
      }
    }, err => {
      console.log(err);
    });
  } 

  getId(){
    this.chatService.getId().subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
        this.my_id = res.body['id'];
      }
    }, err => {
      console.log(err);
    });
  }

  getFollowing(){
    this.chatService.getFollowing().subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
        this.contacts = <Array<any>>res.body;
      }
    }, err => {
      console.log(err);
    });
  }

  sendMessage(id, body, event){
    this.chatService.sendMessage(id, body).subscribe(res=>{
      console.log(res);
      if(res.status == 200) {
        this.messages = (<Array<any>>res.body).reverse();
        this.scrollToBottom();
        event.target.value = "";
      }
    }, err => {
      console.log(err);
    });
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      let message = event.target.value;
      if(message.length > 0){
        this.sendMessage(this.selected, message, event);
      } 
    }
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}


