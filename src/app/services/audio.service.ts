import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  playAudio(): void {
    const audio = new Audio();
    audio.src = '../../assets/sons/pomodoro.mp3';
    audio.load();
    audio.play();
  }
}
