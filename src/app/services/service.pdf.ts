import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global'

@Injectable()//para utilizar en otra Clases
export class UserService{
   public url: string;
   public token :string;
   constructor(private _http: Http){
     this.url = Global.url;
   }

   GeneraPDFfaltas(){
    let headers = new Headers({'Content-Type':'application/json',
                                'Authorization': 'bearer '+this.getToken()});

     return this._http.get(this.url+'rpt/FaltasAtrasos' ,{headers: headers})
            .map(res => res.json());

   }


///Accede a local Sotrage y devuele los datos ya procesados
    getToken(){
       let token = localStorage.getItem('token');
        if(token != "undefined"){
           this.token =token;
        }else
        {
          this.token=null;
        }
         return this.token;
    }


}
