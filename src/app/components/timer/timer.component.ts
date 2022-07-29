import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  settings: any = {
    duration: 1500000,
    rest: 5000,
    longRest: 10000,
    series: 4,
  };

  form: FormGroup = new FormGroup({
    task: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(5),
    ]),
  });

  time: number = this.settings.duration;
  isRunning: boolean = false;
  isResting: boolean = false;
  seriesCounter: number = 0;
  interval: Subscription = interval().subscribe();
  task: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getTask();
  }

  startTimer() {
    this.time = this.settings.duration;
    this.isRunning = true;
    this.interval = interval(1000).subscribe(() => {
      this.time -= 1000;
      this.time === 1497000 && this.completeSerie();
      this.seriesCounter === this.settings.series &&
        alert('Pomodoro terminado');
    });
  }

  stopTimer() {
    this.isRunning = false;
    this.interval.unsubscribe();
  }

  resetTimer() {
    this.isRunning = false;
    this.interval.unsubscribe();
    this.time = this.settings.duration;
    this.seriesCounter = 0;
    this.task = ''
  }

  completeSerie() {
    this.isRunning = false;
    this.interval.unsubscribe();
    if (this.isResting) this.time = this.settings.duration;
    if (!this.isResting) this.time = this.settings.rest;
    this.isResting && this.seriesCounter++;
    this.isResting = !this.isResting;
  }

  startRest() {
    this.time = this.settings.rest;
    this.isRunning = true;
    this.interval = interval(1000).subscribe(() => {
      this.time -= 1000;
      this.time === 0 && this.completeSerie();
    });
  }

  getTask() {
    this.task = this.form.get('task')?.value;
  }
}
