import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Enlaces } from 'src/app/_modelo/enlaces';
import { Roles } from 'src/app/_modelo/roles';
import { EnlacesService } from 'src/app/_servicio/enlaces.service';
import { RolesService } from 'src/app/_servicio/roles.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-enlaces',
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css']
})
export class EnlacesComponent implements OnInit {

  entidad: 'Enlaces';

  datos: Enlaces[];
  dato: Enlaces;
  roles: Roles[];
  enlacesPrincipales: Enlaces[];

  pagina: number = 0;
  numPaginas: number = 0;
  cantidad: number = 10;
  buscar: string = '';
  total: number = 0;
  estado: string = '';

  formulario: FormGroup;
  submitted: boolean = false;

  constructor(
    private _enlacesService: EnlacesService,
    private _rolesService: RolesService,
    private _fb: FormBuilder,
    private _modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'lg';
  }

  ngOnInit(): void {
    this.fdatos();
    this.froles();
    this.ftodosPrincipales();
  }

  froles() {
    this._rolesService.buscarTodos().subscribe((data) => {
      this.roles = data;
    });
  }

  fcantidad() {
    this._enlacesService.cantidadBuscarPorTermino(this.buscar).subscribe((data) => {
      this.total = data;
    });
  }

  ftodosPrincipales(){
    this._enlacesService.buscarTodos().subscribe( data=> {
      this.enlacesPrincipales = data;
    })
  }

  fbuscar(buscar: string) {
    this.buscar = buscar;
    this.pagina = 0;
    this.fdatos();
  }

  fdatos() {
    this._enlacesService.buscarPorTermino(this.buscar, this.pagina, this.cantidad).subscribe((data) => {
      this.fcantidad();
      this.datos = data;
    });
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

  fcambiarcantidad(cantidad: number) {
    this.cantidad=cantidad;
    this.pagina = 0;
    this.buscar = '';
    this.fdatos();
  }

  fformulario(dato: Enlaces) {
    this.formulario = this._fb.group({
      idenlacepadre: [dato.idenlacepadre, [Validators.required]],
      enlacepadre: [dato.enlacepadre, []],
      enlace: [dato.enlace, [Validators.required]],
      ruta: [dato.ruta, []],
      iconoenlace: [dato.iconoenlace, [Validators.required]],
      orden: [dato.orden, [Validators.required]],
      idroles: [dato.idroles, [Validators.required]],
    });
  }
  get f() {
    return this.formulario.controls;
  }

  fadicionar(content: any) {
    this.estado = 'Adicionar';
    this.dato = new Enlaces();
    this.fformulario(this.dato);
    this._modalService.open(content);
  }

  fmodificar(id: number, content: any) {
    this.estado = 'Modificar';
    this._enlacesService.buscarPorId(id).subscribe((data) => {
      this.dato = data;
      this.fformulario(this.dato);
      this._modalService.open(content);
    });
  }

  faceptar(): void {
    this.submitted = true;
    this.dato.idenlacepadre = this.formulario.value.idenlacepadre;
    this.dato.enlace = this.formulario.value.enlace;
    this.dato.ruta = this.formulario.value.ruta;
    this.dato.iconoenlace = this.formulario.value.iconoenlace;
    this.dato.orden = this.formulario.value.orden;
    this.dato.idroles = this.formulario.value.idroles;
    if (this.estado === 'Modificar') {
      this._enlacesService.modificar(this.dato).subscribe(
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
      this._enlacesService.adicionar(this.dato).subscribe(
        (data) => {
          this.fdatos();
          this.ftodosPrincipales();
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
