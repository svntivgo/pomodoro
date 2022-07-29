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
  seriesCounter: number = 0;
  interval: Subscription = interval().subscribe();
  task: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getTask();
  }

  startTimer() {
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
  }

  completeSerie() {
    this.isRunning = false;
    this.interval.unsubscribe();
    this.seriesCounter++;
    this.time = this.settings.duration;
  }

  getTask() {
    this.task = this.form.get('task')?.value;
  }
}
