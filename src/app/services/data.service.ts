import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ISettings } from '../interfaces/ISettings.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  data: ISettings | undefined = localStorage.getItem("data")? JSON.parse(localStorage.getItem("data")!):undefined



  constructor(private router: Router) { }


  saveSettings(data: ISettings) {

    this.data = data
    localStorage.setItem("data", JSON.stringify(data))
    this.router.navigate([''])

  }

}
