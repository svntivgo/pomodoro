import { Injectable } from '@angular/core';
import { IRecord } from '../interfaces/Irecord.interface';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  records: IRecord[] = [{ task: '', date: new Date(), timeLapse: 0 }];

  constructor() {}

  record(record: IRecord) {
    localStorage.setItem('userRecords', JSON.stringify(record));
  }

  loadRecords(): IRecord[] {
    let records: IRecord[] = localStorage.getItem('userRecords')
      ? JSON.parse(localStorage.getItem('userRecords')!)
      : this.records;
    return records;
  }
}
