import { RecordService } from 'src/app/services/record.service';
import { Component, OnInit } from '@angular/core';
import { IRecord } from 'src/app/interfaces/Irecord.interface';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  records: IRecord[] = [];

  constructor(public recordService: RecordService) {
    this.records = this.recordService.loadRecords();
    console.log(this.records)
   }

  ngOnInit(): void {
  }


  clean(){
    localStorage.removeItem("userRecords");
    this.recordService.loadRecords();
  this.records = [];

  }
}
