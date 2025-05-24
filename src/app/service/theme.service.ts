import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Verifica se há uma preferência salva
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode.next(savedTheme === 'dark');
      } else {
        // Verifica a preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.next(prefersDark);
      }
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const newValue = !this.isDarkMode.value;
      this.isDarkMode.next(newValue);
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      document.body.classList.toggle('dark-theme', newValue);
    }
  }
} 