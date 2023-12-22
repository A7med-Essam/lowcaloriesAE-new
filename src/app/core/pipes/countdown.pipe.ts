import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';

@Pipe({
  name: 'countdown',
  pure: false, // Set pure to false to allow for dynamic updates
})
export class CountdownPipe implements PipeTransform {
  private intervalId: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  transform(dayNumber: number, lang:string): string {
    // Recalculate and update the view every second
    let countdownString = '';
    // this.intervalId = setInterval(() => {
    //   countdownString = this.calculateCountdown(dayNumber, lang);
    //   this.cdRef.detectChanges();
    // }, 100000);
    countdownString = this.calculateCountdown(dayNumber, lang);
    return countdownString;
  }

  private calculateCountdown(dayNumber: number,lang:string): string {
    // Calculate the current date and time
    const now = new Date();

    // Set the time to 23:59:59 for the specified day
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + dayNumber,
      23,
      59,
      59
    );

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate.getTime() - now.getTime();

    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format the result as a string
    let time =  lang == 'ar' ? `${days} يوم ${hours}:${minutes}:${seconds}` : `${days} days ${hours}:${minutes}:${seconds}`;
    return time;
  }

  ngOnDestroy() {
    // Clear the interval when the pipe is destroyed
    clearInterval(this.intervalId);
  }
}
