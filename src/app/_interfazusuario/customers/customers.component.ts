import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Customers } from 'src/app/_modelo/customers';
import { CustomersService } from 'src/app/_servicio/customers.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  datos: Customers[];
  dato: Customers;

  pagina: number = 0;
  numPaginas: number = 0;
  cantidad: number = 10;
  buscar: string = '';
  total: number = 0;
  estado: string = '';

  formulario: FormGroup;
  enviado: boolean = false;

  constructor(
    private _customersService: CustomersService,
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
    this._customersService.cantidad(this.buscar).subscribe((data) => {
      this.total = data;
    });
  }

  fbuscar(buscar: string) {
    this.buscar = buscar;
    this.pagina = 0;
    this.fdatos();
  }

  fdatos() {
    this._customersService.datos().subscribe((data) => {
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

  fformulario(dato: Customers) {
    this.formulario = this._fb.group({
      ci: [dato.ci, [Validators.required]],
      name: [dato.name, [Validators.required]],
      lastname: [dato.lastname, []],
      gender: [dato.gender, [Validators.required]],
      birth: [dato.birth, [Validators.required]],
      address: [dato.address, [Validators.required]],
      phone: [dato.phone, [Validators.required]],
    });
  }

  get f() {
    return this.formulario.controls;
  }

  fadicionar(content: any) {
    this.estado = 'Nuevo';
    this.dato = new Customers();
    this.fformulario(this.dato);
    this._modalService.open(content, {
      size : 'md'
    });
  }

  fborrar(id: string){
    this._customersService.eliminar(id).subscribe(
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
    this._customersService.dato(id).subscribe((data) => {
      this.dato = data;
      this.fformulario(this.dato);
      this._modalService.open(content, {
        size : 'md'
      });
    });
  }

  faceptar(): void {
    this.enviado = true;
    this.dato.ci = this.formulario.value.ci;
    this.dato.name = this.formulario.value.name;
    this.dato.lastname = this.formulario.value.lastname;
    this.dato.gender = this.formulario.value.gender;
    this.dato.birth = this.formulario.value.birth;
    this.dato.address = this.formulario.value.address;
    this.dato.phone = this.formulario.value.phone;
    if (this.estado === 'Modificar') {
      this._customersService.modificar(this.dato).subscribe(
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
      this._customersService.adicionar(this.dato).subscribe(
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
