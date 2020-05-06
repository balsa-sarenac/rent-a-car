import { Component, OnInit } from '@angular/core';
import { IMessage } from '../imessage.message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: IMessage[] = [];

  constructor() { }

  ngOnInit(): void {
    this.messages.push({ data: "Cao", person: "Marko", recieved: true });
    this.messages.push({ data: "Poy", person: "Mirko", recieved: false });
    this.messages.push({ data: "Poy", person: "Marko", recieved: true });
  }

}
