import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm!: FormGroup;

  constructor(private chatService: ChatService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.joinRoomForm = this.formBuilder.group({
      user: ['', Validators.required],
      room: ['', Validators.required]
    });
  }

  joinRoom() {
    const { user, room } = this.joinRoomForm.value;
    sessionStorage.setItem("user", user)
    sessionStorage.setItem("room", room)
    this.chatService.joinRoom(user, room).then(() => {
      this.router.navigate(['chat']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
