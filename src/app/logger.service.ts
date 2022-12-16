import { Injectable } from '@angular/core';
import { ILogger } from './i-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements ILogger {
  constructor() {}

  logInfo(val: string): void {
    console.log(`Logger Service: ${val}`);
  }

  logError(val: string): void {
    console.info(`Logger Service: ${val}`);
  }

  logDebug(val: string): void {
    console.debug(`Logger Service: ${val}`);
  }
}
