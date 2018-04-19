import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import {UserService}from './user.service';

@Injectable()
export class LoginGuardGuard  implements CanActivate {
  constructor(
    public _usuarioService: UserService,
    public router: Router

  ) {

  }

  canActivate(){
     this._usuarioService.getToken();
    if ( this._usuarioService.estaLogueado() ) {
        console.log( 'PASO EL GUARD');
        return true;
      } else {
        console.log( 'Bloqueado por guard' );
        this.router.navigate(['/login']);
        return false;
      }
  }
}
