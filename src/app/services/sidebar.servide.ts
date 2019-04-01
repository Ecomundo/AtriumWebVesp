import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menuD: any = [
    { path: '/asistencias', title: 'Asistencias',  icon:'content_paste', class: '' },
    { path: '/leccionario', title: 'Leccionario',  icon:'chrome_reader_mode', class: '' },
    { path: '/planificacion', title: 'Planificación',  icon:'date_range', class: '' }//,
    //{ path: '/observaciones', title: 'Observaciones',  icon:'remove_red_eye', class: '' }
  ];

  menuR: any = [
    { path: '/pago_online', title: 'Pagos Online',  icon:'credit_card', class: '' }
  ];
  constructor() { }
}