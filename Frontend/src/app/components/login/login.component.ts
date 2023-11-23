import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';
import { UsuarioBetaService } from '../../services/usuarioBeta.service';
import { PersonaService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  hidePassword:boolean   = true;
  loading: boolean = false;

  dataLogin: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioServicioService,
    private _personaServicio: PersonaService,
    private _usuarioBeta: UsuarioBetaService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  onLogin() {
    this.loading = true;

    const correo = this.formLogin.value.email;
    const clave = this.formLogin.value.password;

    this._usuarioBeta.getIniciarSesion(correo, clave).subscribe({
      next: (datosUsuarioLogin) => {

        /*for (const login of datosUsuarioLogin) {
          console.log(`Login: ${login.login}  ${login.pass}`);
        }*/

        if (datosUsuarioLogin.length == 1) {
          this.router.navigate(['pages'])
        } else {
          this._snackBar.open("No se encontraron coincidencias", 'Oops!', { duration: 3000 });
        }
      },
      error: (e) => {
        this._snackBar.open("hubo un error", 'Oops!', { duration: 3000 });
      }
    })
  }
}
