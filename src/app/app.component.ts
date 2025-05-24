import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <app-header *ngIf="!isLoginPage()"></app-header>
    <main class="container" [class.login-page]="isLoginPage()">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
      padding: 2rem 0;
    }

    main.login-page {
      padding: 0;
    }

    .container {
      padding-top: 80px; /* Altura do header */
    }

    .login-page.container {
      padding-top: 0;
    }
  `]
})
export class AppComponent {
  title = 'Ford Project';

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
