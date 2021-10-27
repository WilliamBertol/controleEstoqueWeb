import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageResult } from '../models/paginator.model';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar
    ) { }

  buscarProdutos():Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos`;

    return this.http.get<Produto[]>(url);
  }

  buscarProdutosPaged(page: number, size: number, filtro: String): Observable<PageResult<Produto>> {
    const paginator = `?page=${page}&size=${size}&filtro=${filtro}`;
    const url = `${this.baseUrl}/produtos/paged` + paginator;

    return this.http.get<PageResult<Produto>>(url);
  }

  buscarProdutoPorId(idProduto: String):Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${idProduto}`;

    return this.http.get<Produto>(url);
  }

  create(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/produtos`;
    return this.http.post<Produto>(url, produto);
  }

  alterarProduto(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${produto.idProduto}`;
    return this.http.put<Produto>(url, produto);
  }

  deleteProduto(produto: Produto): Observable<void> {
    const url = `${this.baseUrl}/produtos/${produto.idProduto}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
