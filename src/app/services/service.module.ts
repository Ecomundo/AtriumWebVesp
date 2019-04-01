import { NgModule } from '@angular/core';

import {
    LeccionarioServices,
    MateriasDocenteService,
    PlanificacionServices,
    SidebarService,
    UserService,
    LoginGuardGuard,
    PagoOnlineService
} from './service.index';

@NgModule({
    providers: [
        LeccionarioServices,
        MateriasDocenteService,
        PlanificacionServices,
        LoginGuardGuard,
        PagoOnlineService,
        SidebarService,
        UserService
    ]
})
export class ServiceModule { }
