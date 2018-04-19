import { Routes, RouterModule } from '@angular/router';

import {LoginGuardGuard} from '../services/login-guard.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';//leccionario.component
import { LeccionarioComponent } from './leccionario/leccionario.component';
import { PlanifiSemanalComponent } from './planifi-semanal/planifi-semanal.component';
const pagesRoutes: Routes =[
    { path: '',
      component: PagesComponent,
       canActivate: [LoginGuardGuard],
        children: [
          { path: 'dashboard',      component: DashboardComponent },
          { path: 'user-profile',   component: UserProfileComponent },
          { path: 'Asistencias',  component: TableListComponent },
          { path: 'Lecionario',      component: LeccionarioComponent },
          { path: 'Planificacion',   component: PlanifiSemanalComponent },
          { path: 'typography',     component: TypographyComponent },
          { path: 'icons',          component: IconsComponent },
          { path: 'maps',           component: MapsComponent },
          { path: 'notifications',  component: NotificationsComponent },
          { path: 'upgrade',        component: UpgradeComponent },
          //{path: '', redirectTo: 'Faltas-Atrasos', pathMatch: 'full'}
        ],

    },
  //{path: '', redirectTo: 'Faltas-Atrasos', pathMatch: 'full'}
];
export const PagesRouting = RouterModule.forChild(pagesRoutes);
