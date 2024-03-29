import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AudioService } from './../services/audio.service';
import { Usuario } from '../shared/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnica',
  templateUrl: './tecnica.component.html',
  styleUrls: ['./tecnica.component.css']
})
export class TecnicaComponent implements OnInit{

  usuario!: Usuario;
  tempoEstudo! : number;
  tempoDescanso! : number;
  contagemEstudo : number = 0;
  contagemDescanso : number = 0;
  intervalo: any;
  tempoAlarme: any;
  tempos!: FormGroup;
  estudando!: boolean;
  descansando!: boolean;
  alarme!: boolean;
  alarme2!: boolean;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private audioService: AudioService,
    private usuarioService: UsuarioService,
    private router: Router
    ){
      this.usuario = this.usuarioService.getUsuarioLogado();
    }

  ngOnInit(): void {
    this.tempos = this.fb.group({
      tempoEstudo: ['', Validators.required],
      tempoDescanso: ['', Validators.required]
    });
    this.estudando = false;
    this.descansando = false;
    this.alarme = false;
    this.alarme2 = false;
    if(this.usuario == null){
    this.router.navigate([""]);
    }
  }

  iniciar(){
    this.estudando = true;
    this.tempoEstudo = this.tempos.get("tempoEstudo")?.value*1000;
    this.tempoDescanso = this.tempos.get("tempoDescanso")?.value*1000;
    if((this.tempoEstudo && this.tempoDescanso) > 0){
    this.contagemEstudo = 0;
    this.contagemDescanso = 0;

    this.intervalo = setInterval(()=> {
      this.contagemEstudo++
       },1000)
       setTimeout(() => {
        this.estudando = false;
        this.descansando = true;
        this.alarme = true;
        clearInterval(this.intervalo);
        this.pausa();
        this.alarmar();
        this.audioService.playAudio();
          }, this.tempoEstudo);
        }else{
          alert("Valor de tempo inválido")
        }
  }

  pausa(){
    this.intervalo = setInterval(()=> {
      this.contagemDescanso++
       },1000)
       setTimeout(() => {
        this.descansando = false;
        this.alarmar();
        this.alarme2 = true;
        this.pontuar();
        clearInterval(this.intervalo);
          }, this.tempoDescanso);
  }

  alarmar(){
    this.tempoAlarme = setInterval(()=> {
       },1000)
       setTimeout(() => {
        this.alarme = false;
        this.alarme2 = false;
        clearInterval(this.tempoAlarme);
          }, 2000);
  }

  pontuar(){
    this.usuario.pontosExpPet += (2.5*this.tempoEstudo);
    this.usuario.poderPet += (1.3*this.tempoEstudo);
    this.usuario.levelPet = this.usuario.poderPet / 1324;
    this.usuarioService.putUsuario(this.usuario).subscribe();
  }

  voltar(){
    this.location.back();
  }

}
