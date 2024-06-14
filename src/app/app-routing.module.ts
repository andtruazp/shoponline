import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';
import { HomeComponent } from './componentes/home/home.component';
import { authGuard } from './guardias/auth.guard';
import { AddProductoComponent } from './componentes/producto/add-producto/add-producto.component';
import { ProductosComponent } from './componentes/productos/productos.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent 
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add',
    component: AddProductoComponent
  },
  {
    path: 'product',
    component: ProductosComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
