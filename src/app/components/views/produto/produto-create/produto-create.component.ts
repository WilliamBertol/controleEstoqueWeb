import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    idProduto: '',
    codigo: '',
    descricao: ''
  }

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.produto.idProduto = this.route.snapshot.paramMap.get('id')!
    this.buscarProdutoPorId();
  }

  create(): void {
    if (this.produto.idProduto) {

      this.service.alterarProduto(this.produto).subscribe((resposta) => {
  
        this.router.navigate(['produto']);
        this.service.mensagem('Produto alterado com sucesso!');
  
      }, err => {
  
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].defaultMessage);
        }
  
      });

    } else {

      this.service.create(this.produto).subscribe((resposta) => {
  
        this.router.navigate(['produto']);
        this.service.mensagem('Produto criado com sucesso!');
  
      }, err => {
  
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].defaultMessage);
        }
  
      });

    }
  }

  buscarProdutoPorId(): void {
    if (this.produto && this.produto.idProduto) {
      this.service.buscarProdutoPorId(this.produto.idProduto).subscribe((resposta) => {
        this.produto = resposta;
      });
    }
  }

  editar(): void {

  }

  voltarListagemProdutos(): void {
    this.router.navigate(['produto']);
  }
}
