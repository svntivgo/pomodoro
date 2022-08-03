import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ISettings } from 'src/app/interfaces/ISettings.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  $settings: ISettings = {focus: 0, break: 0, longBreak: 0, rounds: 0}

  time: number = this.$settings.focus;
  isRunning: boolean = false;
  isResting: boolean = false;
  seriesCounter: number = 0;
  interval: Subscription = interval().subscribe();
  task: string = '';

  form: FormGroup = new FormGroup([]);

  constructor(public dataService: DataService) {
    this.form = new FormGroup({
      task: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5),
      ]),
    });
    this.$settings = this.dataService.loadSettings();
    console.log(this.$settings)
  }

  ngOnInit(): void {}

  saveData(par: ISettings) {
    console.log(par);
    this.$settings = par;
  }

  startTimer() {
    this.time = this.$settings.focus;
    this.isRunning = true;
    this.interval = interval(1000).subscribe(() => {
      this.time -= 1000;
      this.time === 1497000 && this.completeSerie();
      this.seriesCounter === this.$settings.rounds &&
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
    this.time = this.$settings.focus;
    this.seriesCounter = 0;
    this.task = '';
  }

  completeSerie() {
    this.isRunning = false;
    this.interval.unsubscribe();
    if (this.isResting) this.time = this.$settings.focus;
    if (!this.isResting) this.time = this.$settings.break;
    this.isResting && this.seriesCounter++;
    this.isResting = !this.isResting;
  }

  startRest() {
    this.time = this.$settings.break;
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
