import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../../interfaces/usuario';
import { UsuarioBeta } from '../../../../interfaces/usuarioBeta';
//import { RolServicioService } from '../../../../services/rol-servicio.service';
import { UsuarioBetaService } from '../../../../services/usuarioBeta.service';

@Component({
  selector: 'app-dialog-usuario-beta',
  templateUrl: './dialog-usuario-beta.component.html',
  styleUrls: ['./dialog-usuario-beta.component.css']
})
export class DialogUsuarioBetaComponent implements OnInit, AfterViewInit {
  formUsuario: FormGroup;
  hide: boolean = true;
  accion:string ="Agregar"
  accionBoton: string = "Guardar";

  constructor(
    private dialogoReferencia: MatDialogRef<DialogUsuarioBetaComponent>,
    @Inject(MAT_DIALOG_DATA) public usuarioEditar: UsuarioBeta,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    //private _rolServicio: RolServicioService,
    private _usuarioServicio: UsuarioBetaService
  )
  {

    this.formUsuario = this.fb.group({
      login: ['', Validators.required],
      //correo: ['', Validators.required],
      //idRol: ['', Validators.required],
      clave: ['', Validators.required],
    })


    if (this.usuarioEditar) {
      this.accion = "Editar";
      this.accionBoton = "Actualizar";
    }

    /*this._rolServicio.getRoles().subscribe({
      next: (data) => {

        if (data.status) {

          this.listaRoles = data.value;

          if (this.usuarioEditar)
            this.formUsuario.patchValue({
              //idRol: this.usuarioEditar.idRol
            })

        }
      },
      error: (e) => {
      },
      complete: () => {
      }
    })*/


  }

  ngOnInit(): void {
  
    if (this.usuarioEditar) {

      this.formUsuario.patchValue({
        //nombreApellido: this.usuarioEditar.nombreApellidos,
        login: this.usuarioEditar.login,
        /*idRol: this.usuarioEditar.idRol,*/
        clave: this.usuarioEditar.pass
      })
    }

  }

  ngAfterViewInit() {
    
  }


  agregarEditarUsuario() {
 

    /*const _usuario: Usuario = {
      idUsuario: this.usuarioEditar == null ? 0 : this.usuarioEditar.idUsuario,
      nombreApellidos: this.formUsuario.value.nombreApellido,
      correo: this.formUsuario.value.correo,
      idRol: this.formUsuario.value.idRol,
      rolDescripcion : "",
      clave: this.formUsuario.value.clave
    }*/

    const _usuarioBeta: UsuarioBeta = {
      id: 0,
      login: this.formUsuario.value.login, //.nombreApellido,
      pass: this.formUsuario.value.clave,
      fechaCreacion: ""
    }

    this._usuarioServicio.saveUsuario(_usuarioBeta).subscribe({
      next: (data) => {
        if (data.id > 0) {
          console.log("Usuario Guardado...");
          this.mostrarAlerta("El usuario fue registrado", "Exito");
          this.dialogoReferencia.close('agregado')
        } else {
          this.mostrarAlerta("No se pudo registrar el usuario", "Error");
        }

      },
      error: (e) => {
      },
      complete: () => {
      }
    })

    /*if (this.usuarioEditar) {

      this._usuarioServicio.editUsuario(_usuario).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El usuario fue editado", "Exito");
            this.dialogoReferencia.close('editado')
          } else {
            this.mostrarAlerta("No se pudo editar el usuario", "Error");
          }

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
        }
      })

      
    } else {

      this._usuarioServicio.saveUsuario(_usuarioBeta).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El usuario fue registrado", "Exito");
            this.dialogoReferencia.close('agregado')
          } else {
            this.mostrarAlerta("No se pudo registrar el usuario", "Error");
          }

        },
        error: (e) => {
        },
        complete: () => {
        }
      })      
    }*/
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

}
