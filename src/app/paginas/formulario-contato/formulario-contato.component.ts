import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../componentes/container/container.component";
import { SeparadorComponent } from "../../componentes/separador/separador.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent implements OnInit {

  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl('')
    })
  }

  salvarContato() {
    //if (this.contatoForm.valid) {
    //  console.log("Salvando...");
    //  console.log(this.contatoForm.value);
    //} else {
    //  console.log("Erro de validação...");
    //}
    const novoContato = this.contatoForm.value;
    this.contatoService.salvarContato(novoContato);
    this.contatoForm.reset();
    this.router.navigateByUrl('/lista-contatos');
  }

  cancelar() {
    //console.log("Submissão cancelada...");
    this.contatoForm.reset();
  }

}
