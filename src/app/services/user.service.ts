import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global'
import { Router } from '@angular/router';
@Injectable()//para utilizar en otra Clases
export class UserService{
   public url: string;
   public token :string;
   constructor(private _http: Http,  public router: Router){
     this.url = Global.url;
     this.getToken();
   }
   estaLogueado() {
     return ( this.token !=null ) ? true : false;
   }
   signup(user_to_login){
     let json = JSON.stringify(user_to_login);
     let params =json;
     let datos ;

     let headers = new Headers({'Content-Type':'application/json'});
     return this._http.post(this.url+'Docentes', params ,{headers: headers})
              .map(res => {
                    datos=res.json();
                    this.guardarStorage(datos[0].token, datos[1] )
                    return true;
               },
             );
   }
   guardarStorage(token, datos){

      localStorage.setItem('token', token);
      localStorage.setItem('cod_per', datos.cod_per);
      localStorage.setItem('let_per',  datos.let_per);
      localStorage.setItem('cod_profesor',  datos.cod_profesor);
      localStorage.setItem('nombre',  datos.nombre);
      localStorage.setItem('e_mail',  datos.e_mail);
      localStorage.setItem('username',  datos.username);
      localStorage.setItem('bandera',  datos.bandera);
       this.getToken();
   }
   logout() {

     this.token = null;

     localStorage.removeItem('token');

      localStorage.clear();
     this.router.navigate(['/login']);
   }




///Accede a local Sotrage y devuele los datos ya procesados
    getToken(){

         if(localStorage.getItem('token')){
          this.token =localStorage.getItem('token');

       }else
       {
         this.token=null;

       }
    }


}
