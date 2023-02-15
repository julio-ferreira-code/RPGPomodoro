import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { AudioService } from './../services/audio.service';
import { Usuario } from '../shared/usuario';

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
    private usuarioService: UsuarioService
    ){}

  ngOnInit(): void {
    this.tempos = this.fb.group({
      tempoEstudo: [''],
      tempoDescanso: ['']
    });
    this.estudando = false;
    this.descansando = false;
    this.alarme = false;
    this.alarme2 = false;
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
    this.usuario = this.usuarioService.getUsuarioLogado();
    console.log(this.usuario);
  }

  voltar(){
    this.location.back();
  }

}
