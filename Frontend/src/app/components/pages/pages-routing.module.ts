import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosBetaComponent } from './usuariosBeta/usuariosbeta.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuariosBeta', component: UsuariosBetaComponent }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
