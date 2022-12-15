import {
  Component,
  Inject,
  inject,
  InjectionToken,
  Injector,
} from '@angular/core';
import { ILogger } from './i-logger';

/**
 * 1. Base Url token with default value in case none is provided.
 */
export const BASE_URL = new InjectionToken<string>('My Base Url', {
  providedIn: 'root',
  factory: () => 'https://localhost: 3100',
});

/**
 * 2. Base Logger token with default implementation in case none is provided.
 */
export const LOGGER = new InjectionToken<ILogger>('My Logger', {
  providedIn: 'root',
  factory: () => {
    return {
      logInfo(val: string): void {
        console.log(`Default Info: ${val}`);
      },
      logError(val: string): void {
        console.info(`Default Error: ${val}`);
      },
    };
  },
});

/**
 * Whoever uses this injector will get unique dependency values or instances
 */
export const myInjector = Injector.create({
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost: 7100' },
    {
      provide: LOGGER,
      useFactory: () => {
        return {
          logInfo(val: string): void {
            console.log(`myInjector Log Info: ${val}`);
          },
          logError(val: string): void {
            console.info(`myInjector Log Error: ${val}`);
          },
        };
      },
    },
  ],
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost: 5100' },
    {
      provide: LOGGER,
      useFactory: () => {
        return {
          logInfo(val: string): void {
            console.log(`Component Injector Log Info: ${val}`);
          },
          logError(val: string): void {
            console.info(`Component Injector Log Error: ${val}`);
          },
        };
      },
    },
  ], // Specific to this component only
})
export class AppComponent {
  title = 'my-menu-app';

  constructor(@Inject(LOGGER) cLogger: ILogger) {
    console.log(
      `1.---------Using inject method from v14 to get URL-------------------`
    );
    // Using the new inject from angular/core v14
    const url = inject<string>(BASE_URL);
    console.log('Some Base URL', { url });

    console.log(
      `2.---------Using constructor @Inject(LOGGER) to get ILogger----------`
    );
    console.log(cLogger.logInfo('Some Info'), cLogger.logError('Some Warning'));

    // Using myInjector to proved a new BaseUrl
    console.log(
      `3.---------Using custom injector using the from Injector.create({})---`
    );
    const newUrl = myInjector.get<string>(BASE_URL);
    console.log('A New Base URL',{ newUrl });
    const myLogger = myInjector.get<ILogger>(LOGGER);
    console.log(
      myLogger.logInfo('Some Info'),
      myLogger.logError('Some Warning')
    );
  }
}
