import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { TranslateService } from '../../service/translate.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>{{ translate('profile.title') }}</h1>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <h2>{{ translate('profile.personal_info') }}</h2>
          <div class="info-group">
            <label>{{ translate('profile.name') }}</label>
            <p>{{ username() }}</p>
          </div>
        </div>

        <div class="profile-section">
          <h2>{{ translate('profile.security') }}</h2>
          <div class="info-group">
            <label>{{ translate('profile.password') }}</label>
            <button class="change-password-btn" (click)="changePassword()">
              {{ translate('profile.change_password') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .profile-header {
      margin-bottom: 2rem;

      h1 {
        color: var(--text-primary);
        font-size: 2rem;
        font-weight: 600;
      }
    }

    .profile-content {
      background-color: var(--bg-secondary);
      border-radius: 12px;
      box-shadow: 0 2px 4px var(--shadow-color);
      padding: 2rem;
    }

    .profile-section {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }

      h2 {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
      }
    }

    .info-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: var(--bg-primary);
      border-radius: 8px;

      label {
        color: var(--text-secondary);
        font-weight: 500;
        min-width: 120px;
      }

      p {
        color: var(--text-primary);
        margin: 0;
      }
    }

    .change-password-btn {
      background-color: var(--accent-color);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all var(--transition-speed) ease;

      &:hover {
        opacity: 0.9;
      }
    }

    @media (max-width: 768px) {
      .profile-container {
        padding: 1rem;
      }

      .profile-content {
        padding: 1.5rem;
      }

      .info-group {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        label {
          min-width: auto;
        }
      }
    }
  `]
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);

  username = signal('');

  constructor() {
    this.authService.getUsername().subscribe(name => {
      this.username.set(name);
    });
  }

  changePassword() {
    // TODO: Implementar mudança de senha
  }

  translate(key: string): string {
    return this.translateService.translate(key);
  }
} 