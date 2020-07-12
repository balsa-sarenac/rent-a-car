import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from './chat';
import { Message } from './message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }


  sendMessage(message: Message) {
    // return this.http.post<Message>(environment.api + "/admin/message", message);
    return this.http.post<Message>("http://localhost:8080/message", message);
  }


  getMessages(userId: Number) {
    // return this.http.get<Chat[]>(environment.api + "/admin/message/1");
    return this.http.get<Chat[]>("http://localhost:8080/message/" + userId);
  }

}
