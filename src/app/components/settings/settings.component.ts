import { Component, OnInit } from '@angular/core';
import { ISettings } from 'src/app/interfaces/ISettings.interface';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  focus: number = 25;
  break: number = 15;
  longBreak: number = 25;
  rounds: number = 4;

  settings: ISettings = { focus: 0, break: 0, longBreak: 0, rounds: 0 };

  constructor(public settingsService: SettingsService) {
    this.settings = this.settingsService.loadSettings();
    this.focus = (this.settings.focus / 60) / 1000;
    this.break = (this.settings.break / 60) / 1000;
    this.longBreak = (this.settings.longBreak / 60) / 1000;
    this.rounds = this.settings.rounds;
  }

  ngOnInit(): void {}

  saveData = () => {
    const data: ISettings = {
      focus: this.focus * 60 * 1000,
      break: this.break * 60 * 1000,
      longBreak: this.longBreak * 60 * 1000,
      rounds: this.rounds,
    };
    this.settingsService.saveSettings(data);
  };
}
