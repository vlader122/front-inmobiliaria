import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ArtefactosModule } from '../_artefactos/artefactos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulosRoutingModule } from './modulos-routing.module';
import { EscritorioComponent } from './escritorio/escritorio.component';
import { E401Component } from './e401/e401.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BitacorasComponent } from './bitacoras/bitacoras.component';
import { ContractsComponent } from './contracts/contracts.component';
import { CustomersComponent } from './customers/customers.component';
import { PropertysComponent } from './propertys/propertys.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EnlacesComponent } from './enlaces/enlaces.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ActiveContractsComponent } from './active-contracts/active-contracts.component';

@NgModule({
  declarations: [
    EscritorioComponent,
    E401Component,
    BitacorasComponent,
    ActiveContractsComponent,
    ContractsComponent,
    CustomersComponent,
    PropertysComponent,
    EnlacesComponent,
  ],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    ArtefactosModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PdfViewerModule
  ],
})
export class ModulosModule {}
