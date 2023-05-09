import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: string;
  daysOfWeek: string[];
  daysInMonth: number[];
  currYear: number;
  currMonth: number;
  firstday:number;
  lastdate:number;

  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    this.currYear = date.getFullYear();
    this.currMonth = date.getMonth();
    this.currentDate = this.getCurrentDate();
    this.daysOfWeek = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];
    this.renderCalendar();
  }
  getCurrentDate(): string {
    const months = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    return months[this.currMonth] + ' ' + this.currYear;
  }
  renderCalendar(): void {
    const firstDayofMonth = new Date(this.currYear, this.currMonth, 0).getDay(); 
    this.firstday = firstDayofMonth;
    const lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate(); 
    const lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay(); 
    this.lastdate = lastDateofMonth;
    const lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate(); 
    this.daysInMonth = [];
    let prevMonthDays = lastDateofLastMonth - firstDayofMonth + 1;
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
  prevMonth(): void {
    this.currMonth--;
    if (this.currMonth < 0) {
      this.currMonth = 11;
      this.currYear--;
    }
    this.currentDate = this.getCurrentDate();
    this.renderCalendar();
  }
  nextMonth(): void {
    this.currMonth++;
    if (this.currMonth > 11) {
      this.currMonth = 0;
      this.currYear++;
      }
      this.currentDate = this.getCurrentDate();
      this.renderCalendar();
  }
}