import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../produto-read/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    codigo: '',
    descricao: ''
  }

  constructor(
    private service: ProdutoService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.produto).subscribe((resposta) => {
      this.router.navigate(['produto']);
      this.service.mensagem('Produto criado com sucesso!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].defaultMessage);
      }
    });
  }

  voltarListagemProdutos(): void {
    this.router.navigate(['produto']);
  }
}
