import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UsuarioGuardService } from './guards/usuario-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { RegistrosseguridadComponent } from './pages/registrosseguridad/registrosseguridad.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';


const appRoutes:Routes=[
  {path:'',component:LoginComponent},
  {
    path:'mensajes',
    component:MensajesComponent,
    canActivate:[UsuarioGuardService]
  },
  {
    path:'solicitudes',
    component:SolicitudesComponent,
    canActivate:[UsuarioGuardService]
  },
  {
    path:'registros',
    component:RegistrosseguridadComponent,
    canActivate:[UsuarioGuardService]
  },
  {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
