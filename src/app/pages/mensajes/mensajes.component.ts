import { Component,  OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, OnDestroy {

  texto='';
  mensajesSubscription:Subscription|undefined;
  elemento:any ;
  mensajes:any[]=[];
  constructor(
    public wsService:WebsocketService,
    public chatService:ChatService
    ) { }

  ngOnInit(): void {
    this.elemento=document.getElementById('chat-mensajes');
    this.mensajesSubscription=this.chatService.getMessages().subscribe(msg=>{
      this.mensajes.push(msg);

      setTimeout(()=>{
        this.elemento.scrollTop=this.elemento?.scrollHeight;
      },50)
    })
  }

  ngOnDestroy(): void {
      this.mensajesSubscription?.unsubscribe();
  }

  enviar(){

    if(this.texto.trim().length===0){
      return;
    }
    this.chatService.sendMessage(this.texto);

    this.texto='';
  }

}
