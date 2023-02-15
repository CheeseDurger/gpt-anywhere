export class Timer {
  private startMillisecondsTimestamp: number = new Date().getTime();

  getMillisecondsCount(): number {
    return new Date().getTime() - this.startMillisecondsTimestamp;
  };

  resetMillisecondsCount(): void {
    this.startMillisecondsTimestamp = new Date().getTime();
  };

}