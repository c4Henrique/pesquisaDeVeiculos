import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, UserMenuComponent, MenuComponent],
  template: `
    <div class="layout">
      <app-menu />
      
      <!-- Main Content -->
      <main class="main-content">
        <!-- Header with User Menu -->
        <header class="main-header">
          <div class="header-content">
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
      width: 100vw;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    .main-content {
      flex: 1;
      background-color: var(--bg-primary);
      min-height: 100vh;
      width: 100%;
      transition: all 0.3s ease;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        margin: 0;
      }

      .main-header {
        background-color: var(--bg-secondary);
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;
        width: 100%;

        .header-content {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          margin: 0;
          padding: 0 1rem;
        }
      }

      .content {
        flex: 1;
        padding: 2rem;
        width: 100%;
        margin: 0;
        min-height: calc(100vh - 80px); /* Subtract header height */
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