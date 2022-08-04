import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { IRecord } from 'src/app/interfaces/Irecord.interface';
import { ISettings } from 'src/app/interfaces/ISettings.interface';
import { RecordService } from 'src/app/services/record.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  settings: ISettings = { focus: 0, break: 0, longBreak: 0, rounds: 0 };

  record: IRecord = { task: '', date: new Date(), totalTime: 0 };

  time: number = this.settings.focus;
  isRunning: boolean = false;
  isResting: boolean = false;
  roundsCounter: number = 0;
  interval: Subscription = interval().subscribe();
  task: string = '';

  form: FormGroup = new FormGroup([]);

  constructor(
    public settingsService: SettingsService,
    public recordService: RecordService
  ) {
    this.form = new FormGroup({
      task: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5),
      ]),
    });
    this.settings = this.settingsService.loadSettings();
  }

  ngOnInit(): void {}

  startTimer() {
    this.time = this.settings.focus;
    this.isRunning = true;
    this.interval = interval(1000).subscribe(() => {
      this.time -= 1000;
      this.time === 0 && this.completeSerie();
    });
  }

  stopTimer() {
    this.isRunning = false;
    this.interval.unsubscribe();
  }

  resetTimer() {
    this.isRunning = false;
    this.interval.unsubscribe();
    this.time = this.settings.focus;
    this.roundsCounter = 0;
    this.task = '';
  }

  completeSerie() {
    this.isRunning = false;
    this.interval.unsubscribe();
    if (this.isResting) this.time = this.settings.focus;
    if (!this.isResting) this.time = this.settings.break;
    this.isResting && this.roundsCounter++;
    this.isResting = !this.isResting;
    this.roundsCounter === this.settings.rounds && this.saveRecord();
  }

  startRest() {
    this.time =
      this.roundsCounter === this.settings.rounds - 1
        ? this.settings.longBreak
        : this.settings.break;
    this.isRunning = true;
    this.interval = interval(1000).subscribe(() => {
      this.time -= 1000;
      this.time === 0 && this.completeSerie();
    });
  }

  getTask() {
    this.task = this.form.get('task')?.value;
  }

  saveRecord() {
    this.interval.unsubscribe();
    let totalFocus = this.settings.focus * this.settings.rounds;
    let totalBreaks = this.settings.break * this.settings.rounds - 1;
    let totalLongBreak = this.settings.longBreak;
    this.record = {
      task: this.task,
      date: new Date(),
      totalTime: totalFocus + totalBreaks + totalLongBreak,
    };
    this.recordService.record(this.record);
    this.resetTimer();
    alert('This pomodoro has been saved')
  }
}
