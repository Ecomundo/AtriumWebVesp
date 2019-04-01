import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes,{ useHash:true});
