import { Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  name = "Ready"
  constructor() { }
  playAudio(path: string) {
    let audio = new Audio();
    audio.src = "../assets/audio/" + path + ".wav";
    audio.load();
    audio.play();
  }
  ngOnInit(): void {
    this.playAudio("ready");
    setTimeout(() => {
      this.playAudio("3");
    }, 1000);
    setTimeout(() => {
      this.playAudio("2");
    }, 2000);
    setTimeout(() => {
      this.playAudio("1");
    }, 3000);
    setTimeout(() => {
      this.playAudio("Go");
    }, 4000);
    setTimeout(() => {
      this.name = "go";
      console.log("Test")
    }, 1000);
  }

}
