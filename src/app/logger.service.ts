import { Injectable } from '@angular/core';
import { ILogger } from './i-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements ILogger {
  constructor() {}

  logInfo(val: string): void {
    console.log(`My Logger Service: ${val}`);
  }

  logError(val: string): void {
    console.info(`My Logger Service: ${val}`);
  }

  logDebug(val: string): void {
    console.debug(`My Logger Service: ${val}`);
  }
}
