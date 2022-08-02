import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup = new FormGroup([]);

  constructor() {
    this.form = new FormGroup({
      focus: new FormControl('', [
        Validators.min(5),
        Validators.max(55),
      ]),
      short: new FormControl('', [
        Validators.min(5),
        Validators.max(30),
      ]),
      long: new FormControl('', [
        Validators.min(5),
        Validators.max(55),
      ]),
      round: new FormControl('', [
        Validators.min(1),
        Validators.max(8),
      ]),
    });
  }

  ngOnInit(): void {}
}
