import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '../../service/translate.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-menu" *ngIf="isAuthenticated()">
      <button class="user-button" (click)="toggleMenu()">
        <span class="user-name">{{ username() }}</span>
        <span class="arrow" [class.open]="isMenuOpen()">▼</span>
      </button>

      <div class="dropdown-menu" [class.open]="isMenuOpen()">
        <a class="menu-item" (click)="openProfile()">
          {{ translate('user.profile') }}
        </a>
        <a class="menu-item" (click)="openSettings()">
          {{ translate('user.settings') }}
        </a>
        <div class="menu-divider"></div>
        <a class="menu-item logout" (click)="logout()">
          {{ translate('user.logout') }}
        </a>
      </div>
    </div>
  `,
  styles: [`
    .user-menu {
      position: relative;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: none;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-primary);
      cursor: pointer;
      transition: all var(--transition-speed) ease;

      &:hover {
        background-color: var(--bg-primary);
      }

      .user-name {
        font-weight: 500;
      }

      .arrow {
        font-size: 0.8em;
        transition: transform var(--transition-speed) ease;

        &.open {
          transform: rotate(180deg);
        }
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: 0 4px 6px var(--shadow-color);
      min-width: 200px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all var(--transition-speed) ease;

      &.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .menu-item {
        display: block;
        padding: 0.75rem 1rem;
        color: var(--text-primary);
        text-decoration: none;
        cursor: pointer;
        transition: background-color var(--transition-speed) ease;

        &:hover {
          background-color: var(--bg-primary);
        }

        &.logout {
          color: #dc3545;
        }
      }

      .menu-divider {
        height: 1px;
        background-color: var(--border-color);
        margin: 0.5rem 0;
      }
    }
  `]
})
export class UserMenuComponent {
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);

  isMenuOpen = signal(false);
  username = signal('');
  isAuthenticated = signal(false);

  constructor() {
    this.authService.getUsername().subscribe(name => {
      this.username.set(name);
    });

    this.authService.isAuthenticated().subscribe(authenticated => {
      this.isAuthenticated.set(authenticated);
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  openProfile() {
    this.isMenuOpen.set(false);
    this.router.navigate(['/profile']);
  }

  openSettings() {
    this.isMenuOpen.set(false);
    this.router.navigate(['/settings']);
  }

  logout() {
    this.isMenuOpen.set(false);
    this.authService.logout();
  }

  translate(key: string): string {
    return this.translateService.translate(key);
  }
} 