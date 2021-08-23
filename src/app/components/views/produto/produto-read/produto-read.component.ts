import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from './produto.model';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {

  produtos: Produto[] = [];

  displayedColumns: string[] = ['codigo', 'descricao', 'acoes'];

  constructor(
    private service: ProdutoService,
     private router: Router) { }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos() {
    this.service.buscarProdutos().subscribe(resposta => {
      console.log(resposta);
      this.produtos = resposta;
    });
  }

  navegarParaProdutoCreate() {
    this.router.navigate(["produto/create"]);
  }

}
