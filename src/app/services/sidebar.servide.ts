import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from './user.service';
import { ModelHijosConsul } from '../models/datosHijosConsul.models';

@Injectable()
export class SidebarService {
  menuD: any = [
    { path: '/asistencias', title: 'Asistencias',  icon:'content_paste', class: '' },
    { path: '/leccionario', title: 'Leccionario',  icon:'chrome_reader_mode', class: '' },
    { path: '/planificacion', title: 'Planificación',  icon:'date_range', class: '' }//,
    // { path: '/observaciones', title: 'Observaciones',  icon:'remove_red_eye', class: '' }
  ];

  menuR: any = [
    { path: '/pago_online', title: 'Pagos Online',  icon: 'credit_card', class: '' }
  ];

  url: string;
  HijosList: ModelHijosConsul[];

  constructor(private _http: Http, public _usuarioService: UserService) {
    this.url = Global.url;
  }

  datosHijos(datos: any) {
    const params = JSON.stringify(datos);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this._usuarioService.token
    });
    this._http.post(this.url + 'ConsultaDatosHijos', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelHijosConsul[];
      }).toPromise().then(x => {
        this.HijosList = x;
      })
  }

}
