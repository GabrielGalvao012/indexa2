import { Component, OnInit } from '@angular/core';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { ContainerComponent } from '../../componentes/container/container.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ContatoComponent } from '../../componentes/contato/contato.component';
import { RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { FormsModule } from '@angular/forms';
import { Contato } from '../../componentes/contato/contato';

// import agenda from '../../agenda.json'

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [
    SeparadorComponent,
    ContainerComponent,
    CabecalhoComponent,
    FormsModule,
    ContatoComponent,
    RouterLink
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})

export class ListaContatosComponent implements OnInit {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  // contatos: Contato[] = agenda
  contatos: Contato[] = [];
  filtroPorTexto: string = ''

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.contatos = this.contatoService.obterContatos();
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter(contato => {
      // Compara a letra inicial sem considerar acentuações
      return this.removerAcentos(contato.nome).toLowerCase().startsWith(this.removerAcentos(letra).toLowerCase());
    })
  }

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    }
    return this.contatos.filter(contato => {
      // Compara os nomes sem acentuações
      return this.removerAcentos(contato.nome).toLowerCase().includes(this.removerAcentos(this.filtroPorTexto).toLowerCase());
    })
  }

  // Remove os acentos de uma string
  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
