import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  settings: any = {
    duration: 1500000,
    series: 4,
  };

  time: number = this.settings.duration;
  seriesCounter: number = 0;
  interval: any;

  constructor() {}

  ngOnInit(): void {}

  startTimer() {
    this.interval = setInterval(() => {
      this.time -= 1000;
      this.time === 1497000 && this.completeSerie();
      this.seriesCounter === this.settings.series && alert('Pomodoro terminado')
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  completeSerie() {
    clearInterval(this.interval);
    this.seriesCounter++;
    this.time = this.settings.duration;
  }
}
