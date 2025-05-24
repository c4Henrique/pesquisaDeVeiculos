import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../service/theme.service';
import { TranslateService, Language } from '../../service/translate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-container">
      <h2>Configurações</h2>
      
      <div class="setting-section">
        <h3>Tema</h3>
        <div class="theme-options">
          <button 
            [class.active]="!(isDarkMode$ | async)"
            (click)="toggleTheme()">
            Claro
          </button>
          <button 
            [class.active]="isDarkMode$ | async"
            (click)="toggleTheme()">
            Escuro
          </button>
        </div>
      </div>

      <div class="setting-section">
        <h3>Idioma</h3>
        <div class="language-options">
          <button 
            *ngFor="let lang of languages"
            [class.active]="(currentLang$ | async) === lang.code"
            (click)="setLanguage(lang.code)">
            {{ lang.name }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .setting-section {
      margin-bottom: 2rem;
    }

    .theme-options,
    .language-options {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background: var(--background-color);
      color: var(--text-color);
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    button:hover {
      background: var(--primary-color);
      color: white;
    }

    button.active {
      background: var(--primary-color);
      color: white;
    }
  `]
})
export class SettingsComponent implements OnInit {
  isDarkMode$: Observable<boolean>;
  currentLang$: Observable<Language>;
  languages: { code: Language; name: string }[];

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.currentLang$ = this.translateService.currentLang$;
    this.languages = this.translateService.getLanguages();
  }

  ngOnInit(): void {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLanguage(lang: Language): void {
    this.translateService.setLanguage(lang);
  }
} 