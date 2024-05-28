import { Component, OnInit } from '@angular/core';
import { Contracts2 } from 'src/app/_modelo/customers';
import { ContractsService } from 'src/app/_servicio/contracts.service';

@Component({
  selector: 'app-active-contracts',
  templateUrl: './active-contracts.component.html',
  styleUrls: ['./active-contracts.component.css']
})
export class ActiveContractsComponent implements OnInit {

  datos: Contracts2[];

  constructor(
    private _contractsService: ContractsService
  ) { }

  ngOnInit() {
    this.fdatos();
  }

  fdatos() {
    this._contractsService.contratosActivos().subscribe((data) => {
        this.datos = data;
    });
  }
}
