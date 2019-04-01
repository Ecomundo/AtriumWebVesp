import { Routes, RouterModule } from '@angular/router';

import {LoginGuardGuard} from 'app/services/service.index';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsistenciaComponent } from './docente/asistencia/asistencia.component';
import { LeccionarioComponent } from './docente/leccionario/leccionario.component';
import { PlanifiSemanalComponent } from './docente/planifi-semanal/planifi-semanal.component';
//import { ObservacionesComponent } from './docente/observaciones/observaciones.component';
import { PagoOnlineComponent } from './repre/pago-online/pago-online.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'asistencias', component: AsistenciaComponent },
      { path: 'leccionario', component: LeccionarioComponent },
      { path: 'planificacion', component: PlanifiSemanalComponent },
      //{ path: 'observaciones', component: ObservacionesComponent },
      { path: 'pago_online', component: PagoOnlineComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ],
  },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
