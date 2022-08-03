import { Component,  OnDestroy,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: any;
  
  hora='';
  cuerpo='';
  texto='';
  mensajesSubscription:Subscription|undefined;
  

  elemento:any ;
  totalmensajes:any[]=[];
  mensajes:any[]=[];
  mensajesprivados:any[]=[];
  constructor(
    public wsService:WebsocketService,
    public chatService:ChatService,
    private router:Router
    ) { }

  ngOnInit(): void {
    
    this.mensajesSubscription=this.chatService.getMessages().subscribe((msg:any)=>{
      console.log(msg);
      this.scrollToBottom();
      this.mensajes.push(msg);
    });

   
    


    //Nota : Realizar la vista para el control de datos para registros de movimeintos para seguridad un regalo

  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
  

  ngOnDestroy(): void {
      this.mensajesSubscription?.unsubscribe();
      
  }

  enviar(){

    if(this.texto.trim().length===0){
      return;
    }

    let hoy = new Date();
    let hora = hoy.getHours() + ':' + hoy.getMinutes();

    //hacemos la llamada al socket
    this.chatService.sendMessage(this.texto,hora);

    this.texto='';
  }

 



}
