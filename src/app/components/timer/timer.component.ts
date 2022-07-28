import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  timer: Date = new Date();

  constructor() {
    this.timer.setHours(0, 25, 0);
  }

  ngOnInit(): void {}
}
