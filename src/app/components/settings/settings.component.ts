import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../service/translate.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-container">
      <div class="settings-header">
        <h1>{{ translate('settings.title') }}</h1>
      </div>

      <div class="settings-content">
        <div class="settings-section">
          <h2>{{ translate('settings.appearance') }}</h2>
          
          <div class="setting-group">
            <div class="setting-label">
              <label>{{ translate('settings.theme') }}</label>
              <span class="setting-description">{{ translate('settings.theme_description') }}</span>
            </div>
            
            <div class="theme-toggle">
              <button 
                class="theme-btn" 
                [class.active]="theme() === 'light'"
                (click)="setTheme('light')"
              >
                {{ translate('settings.light_theme') }}
              </button>
              <button 
                class="theme-btn" 
                [class.active]="theme() === 'dark'"
                (click)="setTheme('dark')"
              >
                {{ translate('settings.dark_theme') }}
              </button>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h2>{{ translate('settings.language') }}</h2>
          
          <div class="setting-group">
            <div class="setting-label">
              <label>{{ translate('settings.select_language') }}</label>
              <span class="setting-description">{{ translate('settings.language_description') }}</span>
            </div>
            
            <div class="language-selector">
              <button 
                class="language-btn" 
                [class.active]="language() === 'pt'"
                (click)="setLanguage('pt')"
              >
                {{ translate('settings.portuguese') }}
              </button>
              <button 
                class="language-btn" 
                [class.active]="language() === 'en'"
                (click)="setLanguage('en')"
              >
                {{ translate('settings.english') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .settings-header {
      margin-bottom: 2rem;

      h1 {
        color: var(--text-primary);
        font-size: 2rem;
        font-weight: 600;
      }
    }

    .settings-content {
      background-color: var(--bg-secondary);
      border-radius: 12px;
      box-shadow: 0 2px 4px var(--shadow-color);
      padding: 2rem;
    }

    .settings-section {
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

    .setting-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem;
      background-color: var(--bg-primary);
      border-radius: 8px;
    }

    .setting-label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        color: var(--text-primary);
        font-weight: 500;
        font-size: 1.1rem;
      }

      .setting-description {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }

    .theme-toggle,
    .language-selector {
      display: flex;
      gap: 1rem;
    }

    .theme-btn,
    .language-btn {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      cursor: pointer;
      transition: all var(--transition-speed) ease;

      &:hover {
        border-color: var(--accent-color);
      }

      &.active {
        background-color: var(--accent-color);
        color: white;
        border-color: var(--accent-color);
      }
    }

    @media (max-width: 768px) {
      .settings-container {
        padding: 1rem;
      }

      .settings-content {
        padding: 1.5rem;
      }

      .theme-toggle,
      .language-selector {
        flex-direction: column;
      }
    }
  `]
})
export class SettingsComponent {
  private translateService = inject(TranslateService);

  theme = signal<'light' | 'dark'>('light');
  language = signal<'pt' | 'en'>('pt');

  constructor() {
    // Carregar tema e idioma salvos
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');

    if (savedTheme) {
      this.theme.set(savedTheme as 'light' | 'dark');
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    }

    if (savedLanguage) {
      this.language.set(savedLanguage as 'pt' | 'en');
    }
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }

  setLanguage(language: 'pt' | 'en') {
    this.language.set(language);
    localStorage.setItem('language', language);
    this.translateService.setLanguage(language);
  }

  translate(key: string): string {
    return this.translateService.translate(key);
  }
} 