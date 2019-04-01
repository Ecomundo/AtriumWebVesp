import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Global } from '../global';
import { ModelDeudas } from 'app/models/repre/deudas.models';
import { ModelRepreConsul } from 'app/models/repre/datosRepreConsul.models';
import { ModelFacConsul } from 'app/models/repre/datosFacConsul.models';

@Injectable()
export class PagoOnlineService {

  public url: string;
  public token: string;
  datoFacConsul: ModelFacConsul[] = [];
  datoRepreConsul: ModelRepreConsul[] = [];
  deudasList: ModelDeudas[];

  constructor(private _http: Http) { 
    this.url = Global.url;
  }

  DeudaLista(alumDatos) {
    let json = JSON.stringify(alumDatos);
    let params = json;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });

    this._http.post(this.url + 'PagosPendientes', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelDeudas[];
      }).toPromise().then(x => {
        this.deudasList = x;
      })
  }

  DatosFacConsul(alumDatos) {
    console.log(alumDatos);
    let json = JSON.stringify(alumDatos);
    let params = json;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });

    this._http.post(this.url + 'DatosConsultaFac', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelFacConsul[];
      }).toPromise().then(x => {
        this.datoFacConsul = x;
      })
  }

  DatosFacActu(alumDatos) {
    console.log(alumDatos);
    let json = JSON.stringify(alumDatos);
    let params = json;
    console.log("entra DatosFacActu 2");
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });

    return this._http.post(this.url + 'DatosActualizaFac', params, { headers: headers })
      .map(res => res.json());
  }


  DatosRepreConsul(alumDatos) {
    let json = JSON.stringify(alumDatos);
    let params = json;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });

    this._http.post(this.url + 'DatosConsultaRepre', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelRepreConsul[];
      }).toPromise().then(x => {
        this.datoRepreConsul = x;
      })
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

}