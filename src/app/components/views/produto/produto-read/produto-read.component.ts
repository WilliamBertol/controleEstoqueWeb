import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogConfirmacaoComponent } from '../../dialog-confirmacao/dialog-confirmacao.component';
import { ProdutoService } from '../produto.service';
import { Produto } from '../../models/produto.model';
import { PageResult } from '../../models/paginator.model';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {

  produtos!: PageResult<Produto>;
  filtroBusca: String = "";
  pageInicial: number = 0;
  sizeInicial: number = 10;
  eventoPaginacao!: PageEvent;

  displayedColumns: string[] = ['codigo', 'descricao', 'acoes'];

  constructor(
    private service: ProdutoService,
    private router: Router,
    public dialog: MatDialog
     ) { }

  ngOnInit(): void {
    this.buscarProdutosPaged(this.pageInicial, this.sizeInicial);
  }

  buscarProdutosPaged(page: number, size: number) {
    this.service.buscarProdutosPaged(page, size, this.filtroBusca).subscribe(resposta => {
      this.produtos = resposta;
    });
  }

  navegarParaProdutoCreate() {
    this.router.navigate(["produto/create"]);
  }

  navegarParaProdutoEdit(produto: Produto) {
    this.router.navigate([`produto/create/${produto.idProduto}`]);
  }

  buscarProdutosFiltrados() {
    if (this.eventoPaginacao) {
      
      this.buscarProdutosPaged(this.eventoPaginacao.pageIndex, this.eventoPaginacao.pageSize);
      
    } else {

      this.buscarProdutosPaged(this.pageInicial, this.sizeInicial);
    }
  }

  onPageChange(event: PageEvent) {
    this.eventoPaginacao = event;
    this.buscarProdutosPaged(event.pageIndex, event.pageSize);
  }

  openDialogDelete(produto: Produto): void {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      width: '350px',
      data: `Deseja remover o registro: ${produto.codigo} ${produto.descricao} ?`
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.service.deleteProduto(produto).subscribe((resposta => {

          this.buscarProdutosPaged(this.pageInicial, this.sizeInicial);
          this.service.mensagem("Produto deletado com sucesso!");

        }), err => {

          this.service.mensagem(err.error.error);
        });
      }
    });
  }

}
