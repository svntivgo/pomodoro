import { Component, OnInit, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ISettings } from 'src/app/interfaces/ISettings.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup = new FormGroup([]);

  focus: number = 25;
  break: number = 15
  lBreak: number = 25;
  rounds: number = 4;


  constructor(public dataService: DataService) {

  }

  ngOnInit(): void { }



  saveData = () => {
    const data: ISettings = {
      duration: (this.focus *60 )*1000,
      rest: (this.break *60 )*1000,
      longRest: (this.lBreak *60 )*1000,
      series: this.rounds
    }
    this.dataService.saveSettings(data)

  }


}
