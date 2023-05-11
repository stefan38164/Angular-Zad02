import { Component, OnInit } from '@angular/core';
import { ChangeMonthOrYear, monthArray, daysArray } from './data';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  daysOfWeek!: string[]
  daysInMonth!: number[];
  currYear!: number;
  currMonth!: number;
  firstday!: number;
  lastdate!: number;
  changeType = ChangeMonthOrYear;
  months = monthArray;

  ngOnInit(): void {
    const date = new Date();
    this.currYear = date.getFullYear();
    this.currMonth = date.getMonth();
    this.daysOfWeek = daysArray;
    this.renderCalendar();
  }

  renderCalendar(): void {
    const firstDayofMonth = this.dayOfDate(0);
    this.firstday = firstDayofMonth;
    const lastDateofMonth = this.lastDateOfMonth(this.currMonth + 1);
    this.lastdate = lastDateofMonth;
    const lastDateofLastMonth = this.lastDateOfMonth(this.currMonth);
    this.daysInMonth = [];
    let prevMonthDays = lastDateofLastMonth - firstDayofMonth+1;
    let nextMonthDays = 1;
    for (let i = 0; i < 42; i++) {
      if (i < firstDayofMonth) {
        this.daysInMonth.push(prevMonthDays++);
      } else if (i >= firstDayofMonth + lastDateofMonth) {
        this.daysInMonth.push(nextMonthDays++);
      } else {
        this.daysInMonth.push(i - firstDayofMonth + 1);
      }
    }
  }
  
  changeMonthOrYear(change:number) {
    switch (change) {
      case this.changeType.PrevMonth:
        this.currMonth--;
        if (this.currMonth < 0) {
          this.currMonth = 11;
          this.currYear--;
        }
        break;
      case this.changeType.NextMonth:
        this.currMonth++;
        if (this.currMonth > 11) {
          this.currMonth = 0;
          this.currYear++;
        }
        break;
      case this.changeType.PrevYear:
        this.currYear--;
        break;
      case this.changeType.NextYear:
        this.currYear++;
        break;
    }
  
    this.renderCalendar();
  }
  
  dayOfDate(date: number): number {
    return new Date(this.currYear, this.currMonth, date).getDay();
  }
  lastDateOfMonth(currMonth: number): number {
    return new Date(this.currYear, currMonth, 0).getDate();
  }
  showDate(i: number, day: number): void {
    if (i < this.firstday) {
      this.alert(this.selectDate(--this.currMonth, day));
      this.currMonth++;
    } else if (i >= this.firstday + this.lastdate) {
      this.alert(this.selectDate(++this.currMonth, day));
      this.currMonth--;
    } else {
      this.alert(this.selectDate(this.currMonth, day));
    }
  }
  selectDate(currMonth:number, day:number):Date {
    return new Date(this.currYear, currMonth, day);
  }
  alert(selectedDate: Date) {
    const formattedDate = 
    `${selectedDate.toLocaleDateString('sr-Latn-RS', {weekday: 'long', })} 
    ${selectedDate.getDate()}/${selectedDate.getMonth() + 1 }/${selectedDate.getFullYear()}`;
    alert(formattedDate);
  }
  isCurrentDay(day: number): boolean {
    const today = new Date();
    return (
      this.currYear === today.getFullYear() &&
      this.currMonth === today.getMonth() &&
      day === today.getDate()
    );
  }
}
