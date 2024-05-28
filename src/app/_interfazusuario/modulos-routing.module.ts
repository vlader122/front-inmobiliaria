import { E401Component } from './e401/e401.component';
import { GuardianGuard } from '../_configuracionSeguridad/guardian.guard';
import { EscritorioComponent } from './escritorio/escritorio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitacorasComponent } from './bitacoras/bitacoras.component';
import { ContractsComponent } from './contracts/contracts.component';
import { CustomersComponent } from './customers/customers.component';
import { PropertysComponent } from './propertys/propertys.component';
import { EnlacesComponent } from './enlaces/enlaces.component';
import { ActiveContractsComponent } from './active-contracts/active-contracts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'escritorio',
  },
  {
    path: 'escritorio',
    component: EscritorioComponent,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
  {
    path: 'e401',
    component: E401Component,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
  {
    path: 'bitacoras',
    component: BitacorasComponent,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
  {
    path: 'enlaces',
    component: EnlacesComponent,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
  {
    path: 'clientes',
    component: CustomersComponent,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
  {
    path: 'contratos',
    component: ContractsComponent,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
  {
    path: 'active',
    component: ActiveContractsComponent,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
  {
    path: 'inmuebles',
    component: PropertysComponent,
    canActivate: [GuardianGuard],
    data: {
      rol: 'ROLE_TODOS',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulosRoutingModule {}
