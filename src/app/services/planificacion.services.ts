import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global'
import { Planificacion  } from '../models/planificacion';
import {DetallePlanAdmin} from '../models/DetallePlanAdmin.models';
import { ResponseContentType } from '@angular/http';
@Injectable()//para utilizar en otra Clases
export class PlanificacionServices{
   public url: string;
   public token :string;
     ListPlanificacion: Planificacion[];
     selectedPlanificacion : Planificacion;

     ListDetallePlanAdmin: DetallePlanAdmin[];
     selectedDetallePlanAdmin:DetallePlanAdmin;
   constructor(private _http: Http){
     this.url = Global.url;
   }


   GeneraCodigo(){
     let datos;
       let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
      return this._http.get(this.url+'GeneraCodigo' ,{headers: headers})
               .map(res =>{
                 datos =res.json()
                 return datos.cod_plan;
               });
    }

    InsertCabecera(Cabecera){
      let json = JSON.stringify(Cabecera);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
      return this._http.post(this.url+'InsertaCabeceraPlan', params ,{headers: headers})
               .map(res =>  res.json());
    }

    InsertDetalle(detalle){
      let json = JSON.stringify(detalle);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
      return this._http.post(this.url+'InsertaDetallePlan', params ,{headers: headers})
               .map(res => res.json());
    }
    ConsultaPlanAdmin(detalle){
      let json = JSON.stringify(detalle);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
       this._http.post(this.url+'DetallePlanAdmin', params ,{headers: headers})
                        .map((data : Response) =>{
                        return data.json() as DetallePlanAdmin[];
                        }).toPromise().then(x => {
                        this.ListDetallePlanAdmin = x;
                        })
    }
    ConsultaPlanDocente(detalle){
      let cod_plan
      let json = JSON.stringify(detalle);
      let params =json;
     let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
      return this._http.post(this.url+'DetallePlanAdmin', params ,{headers: headers})
               .map(res =>{
                  //  console.log(res.json().length);
                      if(res.json().length>0)
                      {
                            cod_plan=res.json();
                            if(Object.keys(cod_plan[0]).length>1 )
                            {
                                //console.log(cod_plan[0]);
                                 return cod_plan[0];
                                }
                        }
                       else
                             return null
                 });
    }

      ConsultaPlanDocenteDetalle(cod_plan){

              let params = {cod_plan: cod_plan};

             let headers = new Headers({'Content-Type':'application/json',
                                             'Authorization': 'bearer '+this.getToken()});
              return this._http.post(this.url+'DetallePlanDocente', params ,{headers: headers})
                                .map((data : Response) =>{
                                return data.json() as Planificacion[];
                                }).toPromise().then(x => {
                                this.ListPlanificacion = x;
                                })
      }

    GeneraPDFAdmin(datos){


         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});

    return this._http.post(this.url+'rpt/PlanificacionSemanal',datos ,{headers: headers, responseType: ResponseContentType.Blob })
                      .map(
                            (res) => {
                                return new Blob([res.blob()], { type: 'application/pdf' })
                        });
    }

    SendEmail(detalle){
      let json = JSON.stringify(detalle);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
      return this._http.post(this.url+'email', params ,{headers: headers})
               .map(res => res.json());
    }

    ConsultaParalelo(detalle){
      let json = JSON.stringify(detalle);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
      return this._http.post(this.url+'ConsultaParalelo', params ,{headers: headers})
               .map(res => res.json());
    }

    InsertDuplica(detalle){
      let json = JSON.stringify(detalle);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this.getToken()});
      return this._http.post(this.url+'InsertDuplica', params ,{headers: headers})
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
