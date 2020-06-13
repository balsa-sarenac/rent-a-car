import { Component, OnInit } from '@angular/core';
import { IMessage } from './imessage.message';
import { ConfigService } from '../config/config.service';
import { Chat } from '../interfaces/chat';
import { Message } from '../interfaces/message';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[];
  chats: Chat[] = [];
  messageForm;
  newMessage: Message;
  companionId: Number;

  constructor(private configService: ConfigService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({ text: '' });
  }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.configService.getMessages(1)
      .subscribe((data: Chat[]) => this.chats = data);
  }

  change_messages(chat: Chat) {
    this.companionId = chat.companion.id;
    this.messages = chat.messages;
  }

  onSubmit(mess: { text: String; }) {
    this.newMessage = {
      id: -1,
      text: mess.text,
      sent: new Date(),
      user: 'sent',
      companionId: this.companionId
    };
    this.configService.sendMessage(this.newMessage)
      .subscribe((data: Message) => this.messages.push(data));

    this.messageForm.reset();
  }
}
