import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ISettings } from '../interfaces/ISettings.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  defaultSettings: ISettings = {
    focus: 1500000,
    break: 900000,
    longBreak: 1500000,
    rounds: 4,
  };

  constructor(private router: Router) {}

  saveSettings(settings: ISettings) {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    this.router.navigate(['']);
  }

  loadSettings(): ISettings {
    let settings: ISettings = localStorage.getItem('userSettings')
      ? JSON.parse(localStorage.getItem('userSettings')!)
      : this.defaultSettings;
    return settings;
  }
}
