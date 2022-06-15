import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from 'src/app/components/models/livro.model';
import { LivroService } from 'src/app/components/services/livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = ''
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl('',[Validators.minLength(3)]);
  nomeAutor = new FormControl('',[Validators.minLength(3)])
  texto = new FormControl('',[Validators.minLength(10)])

  constructor(private service: LivroService,
     private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create(): void {
    this.service.create(this.livro,this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Houve um erro na criação do livro!')
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if(this.titulo.invalid) {
      return 'O campo TITULO deve conter entre 3 e 100 caracteres'
    }
    if(this.nomeAutor.invalid) {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres'
    }
    if(this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 10 e 2000000 caracteres'
    }
    return false;
  }

  }
