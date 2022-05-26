import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  public usuario?:Usuario;

  constructor(
    private socket:Socket,
    private router:Router
  ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect',()=>{
      console.log('Conectado al servidor socket');
      this.socketStatus=true;
      this.cargarStorage();
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

    //con esto emitimos el evento al backend
    this.socket.emit(evento,payload,callback);
  }
 /*
 *ESTE METODO SE ENCARGARA DE ESCUCHAR TODOS LOS EVENTOS DEL SERVER
  */
  listen(evento:string){

    return this.socket.fromEvent(evento);

  }

  //se puede manejar con jsonwebtoken y mandarlo por sockets
  loginWS(nombre:string){
    return new Promise((resolve:any, reject:any)=>{
      this.emit('configurar-usuario',{nombre},(resp:any)=>{

        this.usuario=new Usuario(nombre);
        this.guardarStorage();
        //validar la respuesta que obtengamos del servidor

        resolve();
      })
    })
  }

  logoutWS(){
    this.usuario = null || undefined;
    localStorage.removeItem('usuario');

    const payload={
      nombre:'Sin nombre'
    }
    this.emit('configurar-usuario',payload,()=>{});
    this.router.navigateByUrl('/');
  }
  getUsuario(){
    return this.usuario;
  }
  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }

  cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
      this.loginWS(this.usuario?.nombre!);
    }
  }

}
