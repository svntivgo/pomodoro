import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ISettings } from '../interfaces/ISettings.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  defaultSettings: ISettings = {
    focus: 1500000,
    break: 5000,
    longBreak: 10000,
    rounds: 4,
  };

  $settings: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) { }

  saveSettings(settings: ISettings) {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    this.router.navigate(['']);
  }

  loadSettings() {
    let settings: ISettings = localStorage.getItem('userSettings')
      ? JSON.parse(localStorage.getItem('userSettings')!)
      : this.defaultSettings;
    return settings;
  }
}
