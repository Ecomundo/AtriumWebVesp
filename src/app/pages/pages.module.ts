import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

///components
import { ComponentsModule } from '../components/components.module';
////Routes
import { PagesRouting } from './pages.routes';
///Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { PagesComponent } from './pages.component';
import { LeccionarioComponent } from './leccionario/leccionario.component';
import { PlanifiSemanalComponent } from './planifi-semanal/planifi-semanal.component';
//import { Component } from './.component';
//import { ListaFaltasComponent } from './inspector/lista-faltas/lista-faltas.component';
import {LoginGuardGuard} from '../services/login-guard.guard';
import {UserService}from '../services/user.service';

import {GoTopButtonModule} from 'ng2-go-top-button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
////PipeTransform
 import {SearchFilterPipe} from '../SearchFilterPipe'
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PagesRouting,
    GoTopButtonModule,
    BrowserAnimationsModule
  ],
 declarations:[
   DashboardComponent,
   UserProfileComponent,
   TableListComponent,
   TypographyComponent,
   IconsComponent,
   MapsComponent,
   NotificationsComponent,
   UpgradeComponent,
   PagesComponent,
   LeccionarioComponent,
   PlanifiSemanalComponent,
SearchFilterPipe
  // Component,
  // ListaFaltasComponent,

 ],
 exports:[
   DashboardComponent,
   UserProfileComponent,
   TableListComponent,
   TypographyComponent,
   IconsComponent,
   MapsComponent,
   NotificationsComponent,
   UpgradeComponent,
   PagesComponent,
   LeccionarioComponent,
   PlanifiSemanalComponent,
   GoTopButtonModule,
SearchFilterPipe
 //Component,
 ],
  providers: [
LoginGuardGuard,
UserService
  ]
})
export class PagesModule { }
