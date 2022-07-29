import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  seriesCounter: number = 0;
  interval: any;
  task: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.form.get('task')?.valueChanges.subscribe((task) => (this.task = task));
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time -= 1000;
      this.time === 1497000 && this.completeSerie();
      this.seriesCounter === this.settings.series &&
        alert('Pomodoro terminado');
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
