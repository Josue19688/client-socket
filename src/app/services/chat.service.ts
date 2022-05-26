import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService:WebsocketService) { }

  sendMessage(mensaje:string){
    const payload={
      de:this.wsService.getUsuario()?.nombre,
      cuerpo:mensaje
    };

    //mandamos este evento mensaje 
    this.wsService.emit('mensaje',payload);
  }


  //nos devuelve este mensaje de respuesta
  getMessages(){
    return this.wsService.listen('mensaje-nuevo');
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
