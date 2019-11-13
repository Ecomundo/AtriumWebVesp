import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global'  
import { Router } from '@angular/router';
@Injectable()//para utilizar en otra Clases
export class UserService {

  public url: string;
  public token: string;

  constructor(private _http: Http,  public router: Router){

    this.url = Global.url;
    this.getToken();

  }

   estaLogueado() {
     return ( this.token != null ) ? true : false;
   }

   signupD(user_to_login: any) {
    const json = JSON.stringify(user_to_login);
    const params = json;
    let datos;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + 'Docentes', params, { headers: headers })
      .map(res => {
        datos = res.json();
        this.guardarStorageD(datos[0].token, datos[1])
        return true;
      });
  }

  signupR(user_to_login: any) {
    const json = JSON.stringify(user_to_login);
    const params = json;
    let datos: any[];

      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this._http.post(this.url + 'Representantes', params, { headers: headers })
        .map(res => {
          datos = res.json();
          this.guardarStorageR(datos[0].token, datos[1])
          return true;
        });
  }

  guardarStorageD(token: any, datos: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('cod_per', datos.cod_per);
    localStorage.setItem('let_per', datos.let_per);
    localStorage.setItem('cod_profesor', datos.cod_profesor);
    localStorage.setItem('nombre', datos.nombre);
    localStorage.setItem('e_mail', datos.e_mail);
    localStorage.setItem('username', datos.username);
    localStorage.setItem('bandera', datos.bandera);
    localStorage.setItem('cod_emp', '1');
    localStorage.setItem('type', 'D');
    this.getToken();
  }

  guardarStorageR(token: any, datos: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('cod_alum', datos.cod_alum);
    localStorage.setItem('cod_per', datos.cod_per);
    localStorage.setItem('let_per', datos.let_per);
    localStorage.setItem('cod_repre', datos.cod_repre);
    localStorage.setItem('nomrepre', datos.nomrepre);
    localStorage.setItem('email', datos.email);
    localStorage.setItem('parentesco_est', datos.parentesco_est);
    localStorage.setItem('telefono', datos.telefono);
    localStorage.setItem('celular', datos.celular);
    localStorage.setItem('hijos', datos.hijos);
    localStorage.setItem('tipo_representante', datos.tipo_representante);
    localStorage.setItem('type', 'R');
    this.getToken();
  }

  logout() {

    this.token = null;

    localStorage.removeItem('token');

    localStorage.clear();
    this.router.navigate(['/login']);
  }




 // Accede a local Sotrage y devuele los datos ya procesados
  getToken() {

      if (localStorage.getItem('token')){
        this.token = localStorage.getItem('token');
      } else {
        this.token = null;
      }
  }


}
