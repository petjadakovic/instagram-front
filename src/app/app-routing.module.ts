import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGardService } from './auth-gard.service';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGardService] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGardService] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGardService] },
  { path: 'story/:id', component: StoryComponent, canActivate: [AuthGardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
