import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Propertys } from 'src/app/_modelo/propertys';
import { PropertysService } from 'src/app/_servicio/propertys.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-propertys',
  templateUrl: './propertys.component.html',
  styleUrls: ['./propertys.component.css']
})
export class PropertysComponent implements OnInit {

  datos: Propertys[];
  dato: Propertys;

  pagina: number = 0;
  numPaginas: number = 0;
  cantidad: number = 10;
  buscar: string = '';
  total: number = 0;
  estado: string = '';

  formulario: FormGroup;
  enviado: boolean = false;

  constructor(
    private _propertysService: PropertysService,
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
    this._propertysService.cantidad(this.buscar).subscribe((data) => {
      this.total = data;
    });
  }

  fbuscar(buscar: string) {
    this.buscar = buscar;
    this.pagina = 0;
    this.fdatos();
  }

  fdatos() {
    this._propertysService.datos().subscribe((data) => {
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

  fformulario(dato: Propertys) {
    this.formulario = this._fb.group({
      propertyType: [dato.propertyType,[Validators.required]],
      address: [dato.address,[Validators.required]],
      city: [dato.city,[Validators.required]],
      country: [dato.country,[Validators.required]],
      totalArea: [dato.totalArea,[Validators.required]],
      bedrooms: [dato.bedrooms,[Validators.required]],
      bathrooms: [dato.bathrooms,[Validators.required]],
      description: [dato.description,[Validators.required]],
      price: [dato.price,[Validators.required]],
      status: [dato.status,[Validators.required]],
      yearBuilt: [dato.yearBuilt,[Validators.required]],
      transactionType: [dato.transactionType,[Validators.required]],
      additionalComments: [dato.additionalComments,[Validators.required]],
    });
  }

  get f() {
    return this.formulario.controls;
  }

  fadicionar(content: any) {
    this.estado = 'Nuevo';
    this.dato = new Propertys();
    this.fformulario(this.dato);
    this._modalService.open(content, {
      size : 'md'
    });
  }

  fborrar(id: string){
    this._propertysService.eliminar(id).subscribe(
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
    this._propertysService.dato(id).subscribe((data) => {
      this.dato = data;
      this.fformulario(this.dato);
      this._modalService.open(content, {
        size : 'md'
      });
    });
  }

  faceptar(): void {
    this.enviado = true;
    this.dato.propertyType = this.formulario.value.propertyType;
    this.dato.address = this.formulario.value.address;
    this.dato.city = this.formulario.value.city;
    this.dato.country = this.formulario.value.country;
    this.dato.totalArea = this.formulario.value.totalArea;
    this.dato.bedrooms = this.formulario.value.bedrooms;
    this.dato.bathrooms = this.formulario.value.bathrooms;
    this.dato.description = this.formulario.value.description;
    this.dato.price = this.formulario.value.price;
    this.dato.status = this.formulario.value.status;
    this.dato.yearBuilt = this.formulario.value.yearBuilt;
    this.dato.transactionType = this.formulario.value.transactionType;
    this.dato.additionalComments = this.formulario.value.additionalComments;
    if (this.estado === 'Modificar') {
      this._propertysService.modificar(this.dato).subscribe(
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
      this._propertysService.adicionar(this.dato).subscribe(
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
