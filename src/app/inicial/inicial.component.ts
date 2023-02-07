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
        id: 0,
        nome: 'Guerreiro Negro',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'blackWarrior',
      },
      {
        id: 1,
        nome: 'Guerreiro Branco',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'whiteWarrior',
      },
      {
        id: 2,
        nome: 'Arcanjo',
        poder: 0,
        pontosExp: 0,
        raca: 'Humano',
        imagem: 'archAngel',
      }
    ];

    this.getPosicaoArray(0);
  }

  getPosicaoArray(posicao: number) {
    this.classSelecionada = this.listaHerois[posicao].imagem;
  }

  estudar() {
    alert('entrou');
  }
}
