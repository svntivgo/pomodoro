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
      focus: new FormControl('25', [
        Validators.min(15),
        Validators.max(55),
      ]),
      short: new FormControl('15', [
        Validators.min(5),
        Validators.max(30),
      ]),
      long: new FormControl('25', [
        Validators.min(5),
        Validators.max(55),
      ]),
      round: new FormControl('4', [
        Validators.min(2),
        Validators.max(8),
      ]),
    });
  }

  ngOnInit(): void {}
}
