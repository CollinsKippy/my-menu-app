import { Injectable } from '@angular/core';
import { ILogger } from './i-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements ILogger {
  constructor() {}

  logInfo(val: string): void {
    throw new Error('Method not implemented.');
  }

  logError(val: string): void {
    throw new Error('Method not implemented.');
  }

  logDebug(val: string): void {
    throw new Error('Method not implemented.');
  }
}
