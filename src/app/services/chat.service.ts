import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public connnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chat")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];



  constructor() {
    this.start();

    this.connnection.on("ReceiveMessage", (user: string, message: string, messageTime: string) => {
      this.messages = [...this.messages, { user, message, messageTime }];
      this.messages$.next(this.messages);
    });

    this.connnection.on("ConnectedUser", (users: any) => {
      this.connectedUsers$.next(users);
    });

  }

  public async start() {
    try {
      await this.connnection.start();
      console.log("Connection established");
    } catch (err) {
      console.error("Error starting the connection:", err);
      setTimeout(() => this.start(), 2000);
    }
  }

  public async joinRoom(user: string, room: string) {
    return this.connnection.invoke("JoinRoomAsync", { user, room });
  }

  public async sendMessage(message: string) {
    return this.connnection.invoke("SendMessageAsync", message);
  }

  public async leaveChat() {
    return this.connnection.stop();
  }

}
