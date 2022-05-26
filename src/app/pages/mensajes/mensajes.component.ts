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

  cuerpo='';
  texto='';
  mensajesSubscription:Subscription|undefined;
  elemento:any ;
  totalmensajes:any[]=[];
  mensajes:any[]=[];
  mensajescomision:any[]=[];
  constructor(
    public wsService:WebsocketService,
    public chatService:ChatService
    ) { }

  ngOnInit(): void {
    //this.elemento=document.getElementById('chat-mensajes');
    this.mensajesSubscription=this.chatService.getMessages().subscribe((msg:any)=>{
      
      this.totalmensajes.push(msg);

      if(msg.cuerpo==='saliendo'){
        this.mensajescomision.push(msg);
        this.mensajes.forEach((item)=>{
          if(item.de===msg.de){
            let busqueda = this.mensajes.indexOf(item);
            this.mensajes.splice(busqueda,1);
          }
      
        });
      }
      if(msg.cuerpo==='ingresando'){
        this.mensajes.push(msg);

        this.mensajescomision.forEach((item)=>{
         if(item.de===msg.de){
          let busqueda = this.mensajescomision.indexOf(item);
          this.mensajescomision.splice(busqueda,1);
         }
      
        });
      }
    })
  }

  ngOnDestroy(): void {
      this.mensajesSubscription?.unsubscribe();
  }

  enviar(){

    if(this.texto.trim().length===0){
      return;
    }

    //hacemos la llamada al socket
    this.chatService.sendMessage(this.texto);

    this.texto='';
  }

}
