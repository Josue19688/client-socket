import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  constructor(
    private socket:Socket
  ) {
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect',()=>{
      console.log('Conectado al servidor socket');
      this.socketStatus=true;
    });

    this.socket.on('disconnect',()=>{
      console.log('Desconectado al servidor socket');
      this.socketStatus=false;
    })
  }


  /**
   * Evento que se encargara de emitir todos
   * los eventos
   */

  emit(evento:string, payload?:any, callback?:any){
    console.log('Emitiendo evento',evento);
    this.socket.emit(evento,payload,callback);
  }
 /*
 *ESTE METODO SE ENCARGARA DE ESCUCHAR TODOS LOS EVENTOS DEL SERVER
  */
  listen(evento:string){

    return this.socket.fromEvent(evento);

  }

}
