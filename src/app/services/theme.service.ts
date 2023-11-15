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
        rootElement.style.setProperty('--pa-dark-color', 'black')
        break
      case 'theme-dark':
        rootElement.style.setProperty('--pa-light-color', 'black')
        rootElement.style.setProperty('--pa-dark-color', '#EBEBEB')
        break
    }
  }
}
