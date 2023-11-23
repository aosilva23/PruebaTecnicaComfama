import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { PagesComponent } from './pages.component';

import { ReusableModule } from '../reusable/reusable.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosBetaComponent } from './usuariosBeta/usuariosbeta.component';
import { DialogUsuarioComponent } from './modals/dialog-usuario/dialog-usuario.component';
import { DialogUsuarioBetaComponent } from './modals/dialog-usuario-beta/dialog-usuario-beta.component';
import { DialogDeleteUsuarioComponent } from './modals/dialog-delete-usuario/dialog-delete-usuario.component';


@NgModule({
  declarations: [
    PagesComponent,
    NavigationComponent,
    UsuariosComponent,
    UsuariosBetaComponent,
    DialogUsuarioComponent,
    DialogUsuarioBetaComponent,
    DialogDeleteUsuarioComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    ReusableModule
  ]
})
export class PagesModule { }
