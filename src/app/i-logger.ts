export interface ILogger {
  logInfo(val: string): void;
  logError(val: string): void;
  logDebug(val: string): void;
}
