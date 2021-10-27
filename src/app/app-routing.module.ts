import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { AuthGuard } from './components/account/shared/auth.guard';
import { AuthenticationComponent } from './components/view/authentication/authentication.component';
import { HomeComponent } from './components/view/home/home.component';
import { ProdutoCreateComponent } from './components/views/produto/produto-create/produto-create.component';
import { ProdutoReadComponent } from './components/views/produto/produto-read/produto-read.component';

const routes: Routes = [
  {
    path: 'produto',
    component: ProdutoReadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'produto/create',
    component: ProdutoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'produto/create/:id',
    component: ProdutoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
  path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
