import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../service/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <img [src]="logoSrc" alt="Ford Logo" class="ford-logo">
        </div>
        
        <button class="menu-toggle" (click)="toggleMenu()" aria-label="Toggle menu">
          <span class="hamburger"></span>
        </button>

        <nav class="nav-menu" [class.active]="isMenuOpen">
          <ul>
            <li><a routerLink="/home">Home</a></li>
            <li><a routerLink="/dashboard">Dashboard</a></li>
            <li><a routerLink="/calculator">Calculadora</a></li>
            <li><a routerLink="/launch">Lançamento</a></li>
            <li><a routerLink="/contact">Contato</a></li>
          </ul>
        </nav>

        <button class="theme-toggle" (click)="toggleTheme()" aria-label="Toggle theme">
          <i class="material-icons">{{ (isDarkMode$ | async) ? 'light_mode' : 'dark_mode' }}</i>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--header-bg);
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo-container {
      display: flex;
      align-items: center;
    }

    .ford-logo {
      height: 40px;
      width: auto;
    }

    body.dark-mode .ford-logo,
    .dark-mode .ford-logo {
      filter: brightness(0) invert(1);
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background-color: var(--text-color);
      position: relative;
      transition: all 0.3s ease-in-out;
    }

    .hamburger::before,
    .hamburger::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background-color: var(--text-color);
      transition: all 0.3s ease-in-out;
    }

    .hamburger::before {
      transform: translateY(-8px);
    }

    .hamburger::after {
      transform: translateY(8px);
    }

    .nav-menu {
      display: flex;
      align-items: center;
    }

    .nav-menu ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }

    .nav-menu a {
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-menu a:hover {
      color: var(--primary-color);
    }

    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-color);
      padding: 0.5rem;
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }

      .nav-menu {
        position: fixed;
        top: 0;
        right: -100%;
        height: 100vh;
        width: 250px;
        background-color: var(--header-bg);
        padding: 2rem;
        transition: right 0.3s ease-in-out;
      }

      .nav-menu.active {
        right: 0;
      }

      .nav-menu ul {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  isDarkMode$: Observable<boolean>;
  logoSrc = 'https://prodb2cuicontentdelivery-d0bbevfjaxfmedda.z01.azurefd.net/b2cui/assets/images/ford-logo.svg';

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.isDarkMode$.subscribe(isDark => {
      this.logoSrc = isDark
        ? 'assets/images/ford-logo-white.svg'
        : 'https://prodb2cuicontentdelivery-d0bbevfjaxfmedda.z01.azurefd.net/b2cui/assets/images/ford-logo.svg';
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
} 