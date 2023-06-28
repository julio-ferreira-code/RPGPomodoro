import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from './../services/usuario.service';
import { Usuario } from '../shared/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css'],
})
export class InicialComponent implements OnInit {
  heroi!: string;
  nomeHeroi!: string;
  racaHeroi!: string;
  poderHeroi!: number;
  nomeUsuario!: string;
  usuarioLogado!: Usuario;
  usuario!: Usuario;
  level!:number;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location) {
      this.usuario = this.usuarioService.getUsuarioLogado();
    }

  ngOnInit(): void {
    if(this.usuario != null){
    this.usuarioLogado = this.usuarioService.getUsuarioLogado();
    this.getDados();
    }else{
      this.router.navigate([""]);
    }
  }

  getDados() {
    this.heroi = this.usuarioLogado.imagemPet;
    this.nomeHeroi = this.usuarioLogado.nomePet;
    this.racaHeroi = this.usuarioLogado.racaPet;
    this.poderHeroi = this.usuarioLogado.poderPet;
    this.nomeUsuario = this.usuarioLogado.nome;
    this.level = Math.trunc(this.poderHeroi / 1324);
  }

  estudar() {
    this.router.navigate(["tecnica"]);
  }

  voltar(){
    this.location.back();
  }
}
