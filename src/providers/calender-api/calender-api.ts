import { Injectable } from '@angular/core';

@Injectable()
export class CalenderApiProvider {

  // harcoded info for 2018
  days = ['sun', 'mon', 'tues', 'wednes', 'thurs', 'fri', 'satur'];
  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  yearStartDay = 1;

  // hardcoding for Jan, 2018
  monthsData: any[][][] = [
    [
      [{exists: false}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}],
      [{exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}],
      [{exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}],
      [{exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: true}],
      [{exists: true}, {exists: true}, {exists: true}, {exists: true}, {exists: false}, {exists: false}, {exists: false}],
    ]
  ];
  
  constructor() {}

  initMonths() {
    // Well, this shows I tried.
    let curMonthStartDay = this.yearStartDay;
    for (let i = 0; i < this.numDaysInMonth.length; i++) {
      let month = [], week = [];
      for (let j = 1; j <= this.numDaysInMonth[i]; j++) {
        let d = new Date(2018, i, j);
        week.push(d.getDay());
        if (j % 7 == 0) {
          month.push(week)
          week = [];
        }
      }
      if (week.length != 0) month.push(week);
      this.monthsData.push(month);
    }
  }

  public getCalender() {
    return {
      days: this.days,
      numDaysInMonth: this.numDaysInMonth,
      startDay: this.yearStartDay,
      monthsData: this.monthsData
    };
  }

}