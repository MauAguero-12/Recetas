import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'theme-default';

  getTheme(): string{
    return this.currentTheme
  }

  // get theme from localStorage
  getThemeLocalStorage(): void {
    this.currentTheme = localStorage.getItem('theme') || this.currentTheme
    this.setTheme(this.currentTheme)
  }

  setTheme(theme: string): void {
    this.currentTheme = theme
    localStorage.setItem('theme', theme)

    const rootElement = document.documentElement
    switch (this.currentTheme) {
      case 'theme-default':
        rootElement.style.setProperty('--pa-light-color', '#EBEBEB')
        rootElement.style.setProperty('--pa-dark-color', '#2e3a2e')
        rootElement.style.setProperty('--pa-brown', '#774936')
        rootElement.style.setProperty('--pa-shadow', '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)')
        break
      case 'theme-dark':
        rootElement.style.setProperty('--pa-light-color', '#2e3a2e')
        rootElement.style.setProperty('--pa-dark-color', '#EBEBEB')
        rootElement.style.setProperty('--pa-brown', '#D1B490')
        rootElement.style.setProperty('--pa-shadow', '0 4px 8px 0 rgba(50, 147, 111, 0.2), 0 6px 20px 0 rgba(50, 147, 111, 0.19)')
        break
    }
    rootElement.style.setProperty('--pa-theme-transition', '0.5s')
  }
}
