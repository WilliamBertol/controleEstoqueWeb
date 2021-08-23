import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/view/home/home.component';
import { ProdutoCreateComponent } from './components/views/produto/produto-create/produto-create.component';
import { ProdutoReadComponent } from './components/views/produto/produto-read/produto-read.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'produto',
    component: ProdutoReadComponent
  },
  {
    path: 'produto/create',
    component: ProdutoCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
