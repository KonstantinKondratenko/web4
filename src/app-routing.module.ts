import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewsComponent } from './pages/news/news.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "profile", component: ProfileComponent},
  {path: "news", component: NewsComponent},
  {path: "friends", component: FriendsComponent},
  {path: "messages", component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
