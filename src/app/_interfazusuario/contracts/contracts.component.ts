import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Contracts } from 'src/app/_modelo/contracts';
import { ContractsService } from 'src/app/_servicio/contracts.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  datos: Contracts[];
  dato: Contracts;

  pagina: number = 0;
  numPaginas: number = 0;
  cantidad: number = 10;
  buscar: string = '';
  total: number = 0;
  estado: string = '';

  formulario: FormGroup;
  enviado: boolean = false;

  constructor(
    private _contractsService: ContractsService,
    private _fb: FormBuilder,
    private _modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.fdatos();
  }

  fcantidad() {
    this._contractsService.cantidad(this.buscar).subscribe((data) => {
      this.total = data;
    });
  }

  fbuscar(buscar: string) {
    this.buscar = buscar;
    this.pagina = 0;
    this.fdatos();
  }

  fdatos() {
    this._contractsService.datos().subscribe((data) => {
        this.fcantidad();
        this.datos = data;
    });
  }

  fcambiarcantidad(cantidad: number) {
    this.cantidad=cantidad;
    this.pagina = 0;
    this.buscar = '';
    this.fdatos();
  }

  limpiar() {
    this.pagina = 0;
    this.buscar = '';
    this.fdatos();
  }

  mostrarMas(evento: any) {
    this.pagina = evento;
    this.fdatos();
  }

  fformulario(dato: Contracts) {
    this.formulario = this._fb.group({
      property: [dato.property, [Validators.required]],
      customer: [dato.customer, [Validators.required]],
      contractType: [dato.contractType, [Validators.required]],
      startDate: [dato.startDate, [Validators.required]],
      endDate: [dato.endDate, [Validators.required]],
      terms: [dato.terms, [Validators.required]],
      price: [dato.price, [Validators.required]],
    });
  }

  get f() {
    return this.formulario.controls;
  }

  fadicionar(content: any) {
    this.estado = 'Nuevo';
    this.dato = new Contracts();
    this.fformulario(this.dato);
    this._modalService.open(content, {
      size : 'md'
    });
  }

  fborrar(id: string){
    this._contractsService.eliminar(id).subscribe(
      (data) => {
        swal.fire({
          title: '¿Estás seguro?',
          text: 'No podrás revertir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'No, cancelar'
        }).then((result) => {
          this.fdatos();
          this._modalService.dismissAll();
          swal.fire('Dato Eliminado', 'Dato eliminado con exito', 'success');
      })}
    )
  }

  fmodificar(id: number, content: any) {
    this.estado = 'Modificar';
    this._contractsService.dato(id).subscribe((data) => {
      this.dato = data;
      this.fformulario(this.dato);
      this._modalService.open(content, {
        size : 'md'
      });
    });
  }

  faceptar(): void {
    this.enviado = true;
    this.dato.property = this.formulario.value.property;
    this.dato.customer = this.formulario.value.customer;
    this.dato.contractType = this.formulario.value.contractType;
    this.dato.startDate = this.formulario.value.startDate;
    this.dato.endDate = this.formulario.value.endDate;
    this.dato.terms = this.formulario.value.terms;
    this.dato.price = this.formulario.value.price;
    if (this.estado === 'Modificar') {
      this._contractsService.modificar(this.dato).subscribe(
        (data) => {
          this.fdatos();
          this._modalService.dismissAll();
          swal.fire('Dato modificado', 'Dato modificado con exito', 'success');
        },
        (error) => {
          swal.fire('Error', 'Dato duplicado', 'error');
        }
      );
    } else {
      this._contractsService.adicionar(this.dato).subscribe(
        (data) => {
          this.fdatos();
          this._modalService.dismissAll();
          swal.fire('Dato adicionado', 'Dato adicionado con exito', 'success');
        },
        (error) => {
          swal.fire('Error', 'Dato duplicado', 'error');
        }
      );
    }

  }

  fcancelar() {
    this._modalService.dismissAll();
  }

}
