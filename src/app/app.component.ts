import { Component, inject, InjectionToken, Injector } from '@angular/core';
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
        console.log(`Some Log: ${val}`);
      },
      logError(val: string): void {
        console.error(`Some Error: ${val}`);
      },
    };
  },
});

export const myInjector = Injector.create({
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost: 7100' },
    { provide: BASE_URL, useValue: 'http://localhost: 9100' },
  ],
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: BASE_URL, useValue: 'http://localhost: 5100' }],
})
export class AppComponent {
  title = 'my-menu-app';

  constructor() {
    // Using inject from angular/core
    const url = inject<string>(BASE_URL);
    console.log({ url });

    // Using another injector (myInjector) to proved a new BaseUrl
    const newUrl = myInjector.get<string>(BASE_URL);
    console.log({ newUrl });
  }
}
