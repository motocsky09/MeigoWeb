import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from 'src/services/chatbot.service' 

@Component({
  selector: 'app-chatbot-button',
  templateUrl: './chatbot-button.component.html',
  styleUrls: ['./chatbot-button.component.css']
})
export class ChatbotButtonComponent implements AfterViewChecked {
  isOpen = false;
  userInput = '';
  messages: {from: 'user'|'bot', text: string}[] = [
    { from: 'bot', text: 'Salut, sunt Meigo asistentul tău virtual, cu ce te pot ajuta?' }
  ];
  exampleQuestions = [
    'Cum pot verifica datele de livrare?',
    'În câte zile îmi va ajunge comanda?',
    'Care este politica de retunare?'
  ];

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  
  constructor(private chatbotService: ChatbotService) { }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage(text?: string) {
    const msg = text !== undefined ? text : this.userInput;
    if (msg.trim()) {
      this.messages.push({from: 'user', text: msg});
      this.userInput = '';

      
      this.chatbotService.sendMessage(msg).subscribe(
        response => {
          
          this.messages.push({from: 'bot', text: response.response });
        },
        error => {
          
          console.error('Eroare la primirea răspunsului de la AI:', error);
          this.messages.push({from: 'bot', text: 'Ne pare rău, a apărut o eroare. Încearcă din nou mai târziu.' });
        }
      );
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    if (this.messagesContainer) {
      try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      } catch {}
    }
  }
}