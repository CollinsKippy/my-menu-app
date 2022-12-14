import {
  Component,
  Inject,
  inject,
  InjectionToken,
  Injector,
} from '@angular/core';
import { ILogger } from './i-logger';
import { LoggerService } from './logger.service';

/**
 * 1. Base Url token with default value in case none is provided.
 */
export const BASE_URL = new InjectionToken<string>('my_base_url', {
  providedIn: 'root',
  factory: () => 'https://localhost: 3100',
});

/**
 * 2. Base Logger token with default implementation in case none is provided.
 */
export const LOGGER = new InjectionToken<ILogger>('my_small_logger', {
  providedIn: 'root',
  factory: () => {
    return {
      logInfo(val: string): void {
        console.log(`Default Info: ${val}`);
      },
      logError(val: string): void {
        console.info(`Default Error: ${val}`);
      },
      logDebug(val: string): void {
        console.debug(`Default Debug: ${val}`);
      },
    };
  },
});

/**
 * Whoever uses this injector will get different dependency values or instances
 */
export const myInjector = Injector.create({
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost: 7100' },
    { provide: LoggerService, useClass: LoggerService },
    {
      provide: LOGGER,
      useFactory: (loggerService: LoggerService) => {
        return {
          logInfo(val: string): void {
            // console.log(`Custom Injector Provided Log Info: ${val}`);
            loggerService.logInfo(val);
          },
          logError(val: string): void {
            // console.info(`Custom Injector Provided Log Error: ${val}`);
            loggerService.logError(val);
          },
          logDebug(val: string): void {
            console.debug(`Custom Injector Provided Log Debug: ${val}`);
          },
        };
      },
      deps: [LoggerService],
    },
  ],
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost: 5100' },
    { provide: LOGGER, useClass: LoggerService },
    // {
    //   provide: LOGGER,
    //   useFactory: () => {
    //     return {
    //       logInfo(val: string): void {
    //         console.log(`Component-Level Provided Log Info: ${val}`);
    //       },
    //       logError(val: string): void {
    //         console.info(`Component-Level Provided Log Error: ${val}`);
    //       },
    //       logDebug(val: string): void {
    //         console.debug(`Component-Level Injector Provided Log Debug: ${val}`);
    //       },
    //     };
    //   },
    // },
  ],
})
export class AppComponent {
  title = 'my-menu-app';

  constructor(@Inject(LOGGER) cLogger: ILogger) {
    console.log(
      `1.---------Using inject method from v14 to get URL-------------------`
    );
    const url = inject<string>(BASE_URL);

    console.log('Component Provided Base URL', { url });

    console.log(
      `2.---------Using constructor @Inject(LOGGER) to get ILogger----------`
    );
    console.log(cLogger.logInfo('Some Info'), cLogger.logError('Some Warning'));

    console.log(
      `3.---------Using custom injector using the from Injector.create({})---`
    );
    const newUrl = myInjector.get<string>(BASE_URL);

    console.log('Custom Injector Base URL', { newUrl });

    const myLogger = myInjector.get<ILogger>(LOGGER);

    console.log(
      myLogger.logInfo('Some Info'),
      myLogger.logError('Some Warning')
    );
  }
}
