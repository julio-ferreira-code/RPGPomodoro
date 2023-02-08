import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tecnica',
  templateUrl: './tecnica.component.html',
  styleUrls: ['./tecnica.component.css']
})
export class TecnicaComponent implements OnInit{

  tempoEstudo! : number;
  tempoDescanso! : number;
  contagemEstudo : number = 0;
  contagemDescanso : number = 0;
  intervalo: any;
  tempos!: FormGroup;

  constructor(private fb: FormBuilder){
    this.tempos = this.fb.group({
      tempoEstudo: [''],
      tempoDescanso: ['']
    });
  }

  ngOnInit(): void {
    this.tempos = this.fb.group({
      tempoEstudo: [''],
      tempoDescanso: ['']
    });
  }

  iniciar(){
    this.tempoEstudo = this.tempos.get("tempoEstudo")?.value*1000;
    this.tempoDescanso = this.tempos.get("tempoDescanso")?.value*1000;
    if((this.tempoEstudo && this.tempoDescanso) > 0){
    this.contagemEstudo = 0;
    this.contagemDescanso = 0;

    this.intervalo = setInterval(()=> {
      this.contagemEstudo++
       },1000)
       setTimeout(() => {
        clearInterval(this.intervalo);
        this.pausa();
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
        clearInterval(this.intervalo);
          }, this.tempoDescanso);
  }

}
