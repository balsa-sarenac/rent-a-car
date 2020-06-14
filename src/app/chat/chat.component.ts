import { Component, OnInit } from '@angular/core';
import { Chat } from './shared/chat';
import { Message } from './shared/message';
import { FormBuilder } from '@angular/forms';
import { ChatService } from './shared/chat.service';

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

  constructor(private chatService: ChatService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({ text: '' });
  }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.chatService.getMessages(1)
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
    this.chatService.sendMessage(this.newMessage)
      .subscribe((data: Message) => this.messages.push(data));

    this.messageForm.reset();
  }
}
