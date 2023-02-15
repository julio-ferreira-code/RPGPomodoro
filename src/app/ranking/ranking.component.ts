import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit{

usuarios!: Usuario[];
usuario!: Usuario;

constructor(private usuarioservice:UsuarioService){}

  ngOnInit(): void {
    this.listar();
    console.log(this.usuarios);
  }

  listar():Usuario[]{
    this.usuarioservice.getUsuarios().subscribe(
      (usuarios) => (this.usuarios = usuarios).sort((a,b) => a.pet.poder > b.pet.poder ? -1 : 1)
    );
    return this.usuarios;
  }

}
