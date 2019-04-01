import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelHorarios }  from './../../models/horarios.model';
import {UserService}from '../user.service';
import {Http, Response, Headers } from '@angular/http';
import {Global } from './../global'
import {ModelLeccionarioDocente}  from '../../models/leccionario.docente.models';
import {ModelLeccionarioInspector}  from '../../models/LeccionaInspec.models';
import { ResponseContentType } from '@angular/http';
@Injectable()
export class LeccionarioServices {
  selectedHorarios : ModelHorarios;
  HorariosList : ModelHorarios[];
  LeccionarioDocenteList :ModelLeccionarioDocente[];
  selectedLeccionarioDocenteList : ModelLeccionarioDocente;
  LeccionarioInspectorList: ModelLeccionarioInspector[];

  ModelLeccionarioInspector
     public url: string;
  constructor(
    public _usuarioService: UserService,
    private _http: Http
    ){
     this.url = Global.url;
  }

  HorariosDocentes(){
    
     let datos={
                    cod_emp:      3,
                    cod_per:     localStorage.getItem('cod_per'),
                    let_per:       localStorage.getItem('let_per'),

                  };


        let params =JSON.stringify(datos);

        let headers = new Headers({'Content-Type':'application/json',
                                    'Authorization': 'bearer '+this._usuarioService.token});

        this._http.post(this.url+'HorarioLecionario', params ,{headers: headers})
              .map((data : Response) =>{
              return data.json() as ModelHorarios[];
              }).toPromise().then(x => {
              this.HorariosList = x;
        })
    }

    ConsultaLeccionario(datos){
      const ConLeccionarioDo = {
            cod_emp:3,
            cod_per: localStorage.getItem('cod_per'),
            let_per:  localStorage.getItem('let_per'),
            cod_curso  :datos.cod_curso,
            cod_paralelo  :datos.cod_paralelo,
            cod_mat  :datos.cod_mat,
            unidad  :datos.unidad,
            fecha  :datos.fecha,
            cod_profesor  : localStorage.getItem('cod_profesor')
        }
      let params =JSON.stringify(ConLeccionarioDo);

      let headers = new Headers({'Content-Type':'application/json',
                                  'Authorization': 'bearer '+this._usuarioService.token});



        this._http.post(this.url+'ConsultaLeccionario', params ,{headers: headers})
           .map((data : Response) =>{
           return data.json() as ModelLeccionarioDocente[];
           }).toPromise().then(x => {
           this.LeccionarioDocenteList = x;
          })

    }

    InsertaLeccionario(lecionario){
      let json = JSON.stringify(lecionario);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this._usuarioService.token});
      return this._http.post(this.url+'InsertaLeccionario', params ,{headers: headers})
               .map(res =>  res.json());
    }//
    InsertaLeccionarioArreglo(lecionario){
      let json = JSON.stringify(lecionario);
      let params =json;

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this._usuarioService.token});
      return this._http.post(this.url+'InsertaLeccionarioArreglo', params ,{headers: headers})
               .map(res =>  res.json());
    }

    ConsultaLeccionarioInspector(datos){
      const ConLeccionarioDo = {
            cod_emp:3,
            cod_per: localStorage.getItem('cod_per'),
            let_per:  localStorage.getItem('let_per'),
            cod_curso  :datos.cod_curso,
            cod_paralelo  :datos.cod_paralelo,
            unidad  :datos.unidad,
            fecha_ini  :datos.fecha,
            fecha_fin  :datos.fecha_fin,
        }
      let params =JSON.stringify(ConLeccionarioDo);

      let headers = new Headers({'Content-Type':'application/json',
                                  'Authorization': 'bearer '+this._usuarioService.token});


        this._http.post(this.url+'ConsultaLeccionarioInspector', params ,{headers: headers})
           .map((data : Response) =>{
           return data.json() as ModelLeccionarioInspector[];
           }).toPromise().then(x => {
           this.LeccionarioInspectorList = x;
          })


    }

    GeneraPDFLecionario(datos){

         let headers = new Headers({'Content-Type':'application/json',
                                     'Authorization': 'bearer '+this._usuarioService.token});

    return this._http.post(this.url+'rpt/Leccionario',datos ,{headers: headers, responseType: ResponseContentType.Blob })
                      .map(
                            (res) => {
                                return new Blob([res.blob()], { type: 'application/pdf' })
                        });
    }
}
///HorarioLecionario
