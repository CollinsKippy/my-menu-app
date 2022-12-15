import { Component, inject, InjectionToken, Injector } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('Base Url');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: BASE_URL, useValue: 'http://localhost: 4300' }],
})
export class AppComponent {
  title = 'my-menu-app';

  constructor() {
    // Using inject from angular/core
    const url = inject<string>(BASE_URL);
    console.log({ url });

    const myInjector = Injector.create({
      providers: [{ provide: BASE_URL, useValue: 'http://localhost: 5400' }],
    });
    const newUrl = myInjector.get<string>(BASE_URL);
    console.log({ newUrl });
  }
}
