import { ParseSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Estudo } from '../shared/estudo';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit{
estudo! : Estudo;
iniciado: boolean = false;
finalizado!: boolean;
tempoEstudo : number = 5000;
tempoDescanso : number = 5000;
contagemEstudo : number = 0;
contagemDescanso : number = 0;
intervalo: any;

constructor(){}

ngOnInit(): void {

}

iniciar(){
  this.contagemEstudo = 0;
  this.contagemDescanso = 0;
  this.intervalo = setInterval(()=> {
    this.contagemEstudo++
     },1000)
     setTimeout(() => {
      clearInterval(this.intervalo);
      this.pausa();
        }, this.tempoEstudo);
}

pausa(){
  this.intervalo = setInterval(()=> {
    this.contagemDescanso++
     },1000)
     setTimeout(() => {
      clearInterval(this.intervalo);
        }, this.tempoDescanso);
}


}


