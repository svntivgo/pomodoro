import { Injectable } from '@angular/core';
import { IRecord } from '../interfaces/Irecord.interface';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  records: IRecord[] = [{ task: '', date: new Date(), totalTime: 0 }];

  constructor() {}

  record(record: IRecord) {
    let records: any[] = localStorage.getItem('userRecords')
      ? JSON.parse(localStorage.getItem('userRecords')!)
      : [];
    records.unshift(record);
    localStorage.setItem('userRecords', JSON.stringify(records));
  }

  loadRecords(): IRecord[] {
    let records: IRecord[] = localStorage.getItem('userRecords')
      ? JSON.parse(localStorage.getItem('userRecords')!)
      : this.records;
    return records;
  }
}
