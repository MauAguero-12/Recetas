import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'theme-default';

  getTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    this.applyTheme();
  }

  private applyTheme(): void {
    const rootElement = document.documentElement;

    switch (this.currentTheme) {
      case 'theme-default':
        rootElement.style.setProperty('--pa-text-color-alternative', '#EBEBEB');
        break
      case 'theme-dark':
        rootElement.style.setProperty('--pa-text-color-alternative', 'black');
        break
    }




    // // Remove existing theme
    // document.body.classList.remove('theme-default', 'theme-dark');

    // // Add current theme
    // document.body.classList.add(this.currentTheme);

    // // Update stylesheet link
    // const stylesheetLink = document.querySelector('link[rel="stylesheet"]');
    // if (stylesheetLink) {
    //   stylesheetLink.setAttribute('href', `./styles/${this.currentTheme}.css`);
    // }
  }
}
