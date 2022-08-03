import { RecordService } from 'src/app/services/record.service';
import { Component, OnInit } from '@angular/core';
import { IRecord } from 'src/app/interfaces/Irecord.interface';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  records: IRecord[] = [{ task: '', date: new Date(), totalTime: 0 }];

  constructor(public recordService: RecordService) {
    this.records = this.recordService.loadRecords();
    console.log(this.records)
   }

  ngOnInit(): void {
  }

}
