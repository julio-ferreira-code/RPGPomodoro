import { Component, OnInit } from '@angular/core';
import { Pet } from '../shared/pet';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css'],
})
export class InicialComponent implements OnInit {
  listaHerois!: Pet[];
  posicaoSelecionada: number = 0;
  classSelecionada!: string;

  constructor() {}

  ngOnInit(): void {
    this.listaHerois = [
      {
        nome: 'Guerreiro',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'blackWarrior',
      },
      {
        nome: 'Guerreiro 2',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'whiteWarrior',
      },
      {
        nome: 'Guerreiro 3',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'archAngel',
      },
    ];

    this.getPosicaoArray(0);
  }

  getPosicaoArray(posicao: number) {
    this.classSelecionada = this.listaHerois[posicao].imagem;
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

  estudar() {
    alert('entrou');
  }
}
