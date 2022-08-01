import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService:WebsocketService) { }

  sendMessage(mensaje:string,data:string){
    const payload={
      de:this.wsService.getUsuario()?.nombre,
      cuerpo:mensaje,
      hora:data
    };

    let da:any='';
    //mandamos este evento mensaje 
    this.wsService.emit('mensaje',payload);
    this.wsService.emit('mensaje2',payload);
    
  
  }

 

  //nos devuelve este mensaje de respuesta
  getMessages(){
    return this.wsService.listen('mensaje-nuevo');
  }
  getMessages2(){
    return this.wsService.listen('mensaje2-nuevo');
  }
  getRegistros(){
    return this.wsService.listen('registro-nuevo');
  }

  getMessagesPrivate(){
    return this.wsService.listen('mensaje-privado');
  }

  getUsuariosActivos(){
    return this.wsService.listen('usuarios-activos');
  }
  emitirUsuariosActivos(){
    this.wsService.emit('obtener-usuarios');
  }
}
