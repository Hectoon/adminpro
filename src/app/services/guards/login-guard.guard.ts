import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  //creo el costructor para poder usar el UsuarioService y router
  constructor(public _usuarioService:UsuarioService,public router: Router){

  }
  
  canActivate(){

    if (this._usuarioService.estaLogeado()) {
      console.log('paso por el guard');
      return true;
    } else {
      console.log('BLOQUEADO');
      this.router.navigate(['/login']);
      return false;
    }  
  }
}
