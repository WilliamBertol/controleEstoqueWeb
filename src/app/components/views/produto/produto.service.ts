import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from './produto-read/produto.model';

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
    const url = this.baseUrl + '/produtos';

    return this.http.get<Produto[]>(url);
  }

  create(produto: Produto): Observable<Produto> {
    const url = this.baseUrl + '/produtos'
    return this.http.post<Produto>(url, produto);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
