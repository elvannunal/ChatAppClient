import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { Router } from "@angular/router";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService,
              private router: Router)
              {  }
  inputMessage = "";
  searchText="";
  messages: any[] = [];
  user:any;
  loggedInUserName=sessionStorage.getItem("user");
  roomName=sessionStorage.getItem("room")
  ngOnInit(): void {
    this.chatService.messages$.subscribe(res => {
      this.messages = res;
      console.log("this.messages", this.messages);
    });
    this.users();
  }
  sendMessage() {
   this.chatService.sendMessage(this.inputMessage).then(() => {
     this.inputMessage = "";
   }).catch(err => {
     console.log(err);
   });
  }
  leaveChat() {
    this.chatService.leaveChat().then(() => {
      this.router.navigate(['welcome']);
    }).catch(err => {
      console.log(err);
    });
  }
  users(){
    this.chatService.connectedUsers$.subscribe(response=>{
      this.user=response;
    })
  }


}
