import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-registrosseguridad',
  templateUrl: './registrosseguridad.component.html',
  styleUrls: ['./registrosseguridad.component.css']
})
export class RegistrosseguridadComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: any;

  registroSubscription:Subscription|undefined;
  mensajes:any[]=[];
  salidas:any[]=[];
  ingresos:any[]=[];
  constructor(
    public wsService:WebsocketService,
    public chatService:ChatService
  ) { }

  ngOnInit(): void {

    this.registroSubscription=this.chatService.getMessages2().subscribe((msg:any)=>{

      //haremos toda la logica para separa entradas y salidas

      if(msg.movimiento=='Salida'){
        this.salidas.push(msg);
        const indice = this.ingresos.findIndex(result=>result.numero_gafete===msg.numero_gafete);
        this.ingresos.splice(indice,1);
        console.log('====ARRAY DE INGRESO DE DATOS===');
        console.log(this.ingresos);
      }else{
        this.ingresos.push(msg);
        const indice = this.salidas.findIndex(result=>result.numero_gafete===msg.numero_gafete);
        this.salidas.splice(indice,1);
        console.log('====ARRAY DE SALIDAS DE DATOS');
        console.log(this.salidas);
      }
      
      
      this.mensajes.push(msg);
    });

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
      this.registroSubscription?.unsubscribe();
      
  }

}
