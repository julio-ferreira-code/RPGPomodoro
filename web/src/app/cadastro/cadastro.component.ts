import { Usuario } from './../shared/usuario';
import { UsuarioService } from './../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pet } from '../shared/pet';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastro!: FormGroup;
  listaHerois!: Pet[];
  posicaoSelecionada: number = 0;
  classSelecionada!: string;
  racaHeroi!: string;
  nomeHeroi!: string;
  errMess!: string;
  usuario!:Usuario;

  constructor(private fb: FormBuilder,
  @Inject('baseURL') public baseURL:HttpClient,
   private router: Router,
   public usuarioService:UsuarioService,
   private location: Location) {}
  ngOnInit(): void {
    this.listaHerois = [
      {
        id: 0,
        level:0,
        nome: 'Guerreiro Negro',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'blackWarrior',
      },
      {
        id: 1,
        level:0,
        nome: 'Guerreiro Branco',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'whiteWarrior',
      },
      {
        id: 2,
        level:0,
        nome: 'Arcanjo',
        poder: 0,
        pontosExp: 0,
        raca: 'Anjo',
        imagem: 'archAngel',
      }
    ];

    this.getPosicaoArray(0);
    this.cadastro = this.fb.group({
      nome: ['',Validators.required],
      email:['', [Validators.email,Validators.required]],
      senha:['', Validators.required],
      pet:[]
    });
  }

  getPosicaoArray(posicao: number):Pet {
    this.classSelecionada = this.listaHerois[posicao].imagem;
    this.racaHeroi = this.listaHerois[posicao].raca;
    this.nomeHeroi = this.listaHerois[posicao].nome
    return this.listaHerois[this.posicaoSelecionada];
  }

  avancar() {
    this.posicaoSelecionada + 2 > this.listaHerois.length
      ? (this.posicaoSelecionada = 0)
      : this.posicaoSelecionada++;
      this.getPosicaoArray(this.posicaoSelecionada);
  }

  voltar() {

    this.posicaoSelecionada - 1 < 0
      ? (this.posicaoSelecionada = this.listaHerois.length-1)
      : this.posicaoSelecionada--;
      this.getPosicaoArray(this.posicaoSelecionada);

  }

  cadastrar() {
    this.usuario = this.cadastro.value;
    if(this.validaUsuario(this.usuario)){
    this.usuario.pet = this.getPosicaoArray(this.posicaoSelecionada);
    this.usuarioService.postUsuario(this.usuario)
      .subscribe(usuario => {
        this.usuario = usuario;
        confirm("Cadastrado com sucesso!");
        this.location.back();
      },
        errmess => { this.usuario = <any>null; this.errMess = <any>errmess;});
    this.cadastro.reset({
      nome: '',
      email: '',
      senha: '',
      pet: []
    });
  }else{
    alert("Dados inválidos");
  }
  }

  validaUsuario(usuario: Usuario): boolean{
    console.log(usuario.email + ' ' + usuario.senha + ' ' + usuario.nome)
    if((usuario.email && usuario.senha && usuario.nome) != ''){
      return true;
    }
    return false;
  }

  cancelar(){
    this.location.back();
  }

}
