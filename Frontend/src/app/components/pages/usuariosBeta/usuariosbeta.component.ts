import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuarioComponent } from '../modals/dialog-usuario/dialog-usuario.component';
import { DialogUsuarioBetaComponent } from '../modals/dialog-usuario-beta/dialog-usuario-beta.component';
import { DialogDeleteUsuarioComponent } from '../modals/dialog-delete-usuario/dialog-delete-usuario.component';
import { UsuarioBeta } from '../../../interfaces/usuarioBeta';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsuarioBetaService } from '../../../services/usuarioBeta.service';

const ELEMENT_DATA: UsuarioBeta[] = [
  /*{ id: 1, login: "AOSILVA", pass: "1234", fechaCreacion:"10/01/2023"},
  { id: 2, login: "JK", pass: "1357", fechaCreacion: "10/01/2023" },
  { id: 3, login: "PIPE", pass: "2468", fechaCreacion: "10/01/2023" },*/
];

@Component({
  selector: 'app-usuarios-beta',
  templateUrl: './usuariosbeta.component.html',
  styleUrls: ['./usuariosbeta.component.css']
})
export class UsuariosBetaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['login', 'pass', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listaUsuario: UsuarioBeta[] = [];

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioBetaService
  )
  {
    
  }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarUsuarios() {
    this._usuarioServicio.getUsuarios().subscribe({
      next: (data) => {
        if (data.length > 0) {          
          this.listaUsuario = data;
          console.log(" datos --> " + this.listaUsuario);
          this.dataSource.data = this.listaUsuario;
          //this.dataSource.data = ELEMENT_DATA;
        } else {
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
        }
      },
      error: (e) => {
        console.log("Error : " + e);
        //this._snackBar.open("hubo un error", 'Oops!', { duration: 3000 });
      },
      complete: () => {

      }
    })
  }

  agregarUsuario() {
    this.dialog.open(DialogUsuarioBetaComponent, {
        disableClose: true
      }).afterClosed().subscribe(result => {
        
        if (result === "agregado") {
          this.mostrarUsuarios();
        }
      });
  }

  editarUsuario(usuario: UsuarioBeta) {
    this.dialog.open(DialogUsuarioBetaComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(result => {
      
      if (result === "editado")
        this.mostrarUsuarios();

    });
  }

  eliminarUsuario(usuario: UsuarioBeta) {
    this.dialog.open(DialogDeleteUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(result => {
      
      if (result === "eliminar") {

        /*this._usuarioServicio.deleteUsuario(usuario.idUsuario).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta("El usuario fue eliminado", "Listo!")
              this.mostrarUsuarios();
            } else {
              this.mostrarAlerta("No se pudo eliminar el usuario", "Error");
            }

          },
          error: (e) => {
          },
          complete: () => {
          }
        })*/

      }
        

    });
  }

  mostrarAlerta(mensaje:string,tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }


}
