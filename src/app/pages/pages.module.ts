import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Routes
import { PAGES_ROUTES } from './pages.routes';

//Modules
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from 'app/services/service.module';
import { GoTopButtonModule } from 'ng2-go-top-button';

//PipeTransform
import {SearchFilterPipe} from '../SearchFilterPipe'

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsistenciaComponent } from './docente/asistencia/asistencia.component';
import { LeccionarioComponent } from './docente/leccionario/leccionario.component';
import { PlanifiSemanalComponent } from './docente/planifi-semanal/planifi-semanal.component';
//import { ObservacionesComponent } from './docente/observaciones/observaciones.component';
import { PagoOnlineComponent } from './repre/pago-online/pago-online.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    PAGES_ROUTES,
    GoTopButtonModule,
    BrowserAnimationsModule
  ],
 declarations:[
  PagesComponent,
  DashboardComponent,
  AsistenciaComponent,
  LeccionarioComponent,
  PlanifiSemanalComponent,
  //ObservacionesComponent,
  PagoOnlineComponent,
  SearchFilterPipe

 ],
 exports:[
  PagesComponent,
  DashboardComponent,
  AsistenciaComponent,
  LeccionarioComponent,
  PlanifiSemanalComponent,
  //ObservacionesComponent,
  PagoOnlineComponent,
  GoTopButtonModule,
  SearchFilterPipe,
  ServiceModule
 ],
  providers: [
DatePipe
//UserService
  ]
})
export class PagesModule { }
