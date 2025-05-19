import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, UserMenuComponent],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar" [class.open]="isSidebarOpen">
        <div class="sidebar-header">
          <button class="toggle-btn" (click)="toggleSidebar()">
            <span class="hamburger"></span>
          </button>
          <h3>Bem-vindo ao sistema Ford!</h3>
        </div>
        
        <nav class="sidebar-nav">
          <a routerLink="/home" routerLinkActive="active">Home</a>
          <a routerLink="/calculator" routerLinkActive="active">Calculadora</a>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Header with User Menu -->
        <header class="main-header">
          <div class="header-content">
            <button class="menu-toggle" (click)="toggleSidebar()">
              <span class="hamburger"></span>
            </button>
            <app-user-menu />
          </div>
        </header>

        <!-- Page Content -->
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 250px;
      background: linear-gradient(180deg, #102B4E 0%, #0066FF 200%);
      color: white;
      transition: all 0.3s ease;
      position: fixed;
      height: 100vh;
      z-index: 1000;

      &.open {
        transform: translateX(0);
      }

      .sidebar-header {
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;

        h3 {
          margin: 0;
          font-size: 18px;
          color: white;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;

          .hamburger {
            display: block;
            width: 25px;
            height: 3px;
            background: white;
            position: relative;

            &::before,
            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background: white;
              left: 0;
            }

            &::before {
              top: -8px;
            }

            &::after {
              bottom: -8px;
            }
          }
        }
      }

      .sidebar-nav {
        padding: 20px 0;

        a {
          display: block;
          padding: 12px 20px;
          color: white;
          text-decoration: none;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          &.active {
            background-color: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }

    .main-content {
      flex: 1;
      margin-left: 250px;
      background-color: var(--bg-primary);
      min-height: 100vh;
      transition: all 0.3s ease;

      .main-header {
        background-color: var(--bg-secondary);
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;

          &:hover {
            background-color: var(--bg-primary);
          }

          .hamburger {
            display: block;
            width: 24px;
            height: 2px;
            background: currentColor;
            position: relative;

            &::before,
            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background: currentColor;
              left: 0;
            }

            &::before {
              top: -8px;
            }

            &::after {
              bottom: -8px;
            }
          }
        }
      }

      .content {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }

      .main-content {
        margin-left: 0;

        .main-header {
          .menu-toggle {
            display: block;
          }
        }
      }
    }
  `]
})
export class LayoutComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
} 