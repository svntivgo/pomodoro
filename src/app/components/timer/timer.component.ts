import { Component, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  targetTime: number = 1500000;
  interval: any;

  constructor() {}

  ngOnInit(): void {}

  startTimer() {
    let second: number = 1000;

    this.interval = setInterval(() => {
      this.targetTime -= 1000;
      this.targetTime === 1490000 && clearInterval(this.interval);
    }, second);
  }

  stopTimer() {
    clearInterval(this.interval);
  }
}
