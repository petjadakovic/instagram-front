import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,private homeService: HomeService,  private router: Router) { }

  private sub: any;
  private sub2: any;
  user_id : string;
  story;
  stories;

  counter: any;

  current = -1;

  server_url = environment.server_url;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(this.current);
      this.user_id = params['id'];
      this.getStories();
   });
  }

  openProfile(user){
    this.router.navigate(['/user', user.id]);
  }

  previous(){
    if(this.current > 0){
      this.current--;
    }
  }

  next(){
    if(this.current < this.stories.length -1){
      this.current++;
    } else{
      this.close();
    }
  }

  pause(){
    // this.counter.unsubscribe();
  }

  resume(){
   
          // this.counter.subscribe(n =>
          //   this.next());
  }

  close(){
    this.router.navigate(['/']);
  }

  public getStories(){
    this.homeService.getStories().subscribe(res=>{
      console.log(res);

      if(res.status == 200) {
        console.log(res.body);
        let storyreplys = <Array<any>>res.body;
        this.current = 0;
        this.stories = [];
        let i = 0;
        for(let storyreply of storyreplys){
          for(let story of storyreply.stories){
            let my_story = [];
            my_story['story'] = story;
            my_story['user'] = storyreply.user;

            if(this.current == -1 && storyreply.user.id == this.user_id){
              this.current = i;
            }

            this.stories.push(my_story);
            console.log(story);
            i++;
          }
        }
        if(this.current == -1){
          this.close();
        } else{
          this.counter = interval(this.stories[this.current].story.duration * 1000);
          this.counter.subscribe(n =>
            this.next());
        }
        console.log(this.stories);
      }
    }, err => {
      console.log(err);
    });
   }
}
