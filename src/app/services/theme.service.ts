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
        rootElement.style.setProperty('--pa-theme-white', '#EBEBEB')
        rootElement.style.setProperty('--pa-theme-black', '#000000')
        rootElement.style.setProperty('--pa-theme-brown', '#774936')
        rootElement.style.setProperty('--pa-theme-shadow', '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)')
        break
      case 'theme-dark':
        rootElement.style.setProperty('--pa-theme-white', '#001000')
        rootElement.style.setProperty('--pa-theme-black', '#EBEBEB')
        rootElement.style.setProperty('--pa-theme-brown', '#D1B490')
        rootElement.style.setProperty('--pa-theme-shadow', '0 6px 12px 0 rgba(50, 147, 111, 0.2), 2px -2px 1px 0 rgba(50, 147, 111, 0.2), 0 8px 20px 0 rgba(50, 147, 111, 0.19)')
        break
    }
    rootElement.style.setProperty('--pa-theme-transition', '0.5s')
  }
}
