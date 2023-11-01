import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {JoinRoomComponent} from "./components/join-room/join-room.component";
import {ChatComponent} from "./components/chat/chat.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";

const routes:Routes=[
  {path:'',redirectTo:'welcome',pathMatch:"full"},
  {path:'join-room',component:JoinRoomComponent},
  {path:'chat',component:ChatComponent},
  {path:'welcome',component:WelcomeComponent}
]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
