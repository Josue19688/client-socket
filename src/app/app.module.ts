import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url:environment.wsUrl, options: {} };


import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { RegistrosseguridadComponent } from './pages/registrosseguridad/registrosseguridad.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ListaUsuariosComponent,
    LoginComponent,
    MensajesComponent,
    SidebarComponent,
    SolicitudesComponent,
    RegistrosseguridadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
