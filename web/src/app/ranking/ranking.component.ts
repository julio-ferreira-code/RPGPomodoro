import { Location } from '@angular/common';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit{

usuarios!: Usuario[];
usuario!: Usuario;

constructor(
  private usuarioservice:UsuarioService,
  private router:Router,
  private location:Location)
  {
    this.usuario = this.usuarioservice.getUsuarioLogado();
  }

  ngOnInit(): void {
    if(this.usuario != null){
    this.listar();
    }else{
      this.router.navigate([""]);
    }
  }

  listar():Usuario[]{
    this.usuarioservice.getUsuarios().subscribe(
      (usuarios) => (this.usuarios = usuarios).sort((a,b) => a.poderPet > b.poderPet ? -1 : 1)
    );
    return this.usuarios;
  }

  voltar(){
    this.location.back();
  }

}
