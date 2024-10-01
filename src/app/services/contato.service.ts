import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly API = 'http://localhost:3000/contatos'; // Json Server API
  //private readonly API = 'http://localhost:8080/contatos'; // Spring Boot API

  constructor(private http: HttpClient) { }

  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.API);
  }

  salvarContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.API, contato);
  }

  buscarPorId(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`
    return this.http.get<Contato>(url)
  }

  excluirContato(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`
    return this.http.delete<Contato>(url)
  }

  editarContato(contato: Contato): Observable<Contato> {
    const url = `${this.API}/${contato.id}`
    return this.http.put<Contato>(url, contato)
  }

  editarOuSalvarContato(contato: Contato): Observable<Contato> {
    if (contato.id) {
      return this.editarContato(contato)
    } else {
      console.log(contato);
      return this.salvarContato(contato)
    }
  }
}