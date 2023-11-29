import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUserComponent } from './components/listar-user/listar-user.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';


const routes: Routes = [
  { path: "listar", component: ListarUserComponent },
  { path: 'crear', component: CrearClienteComponent },
  { path: 'crear/:id', component: CrearClienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
