import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from './chat';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }


  sendMessage(message: Message) {
    return this.http.post<Message>("http://localhost:8086/admin/message", message);
  }


  getMessages(userId: Number) {
    return this.http.get<Chat[]>("http://localhost:8086/admin/message/" + userId);
  }

}
