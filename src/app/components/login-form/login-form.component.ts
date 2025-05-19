import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { TranslateService, Language } from '../../service/translate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translateService = inject(TranslateService);

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    lgpd: new FormControl(false, [Validators.requiredTrue])
  });

  authorized = signal(false);
  errorMessageSignal = signal("");
  isLanguageMenuOpen = signal(false);
  currentLang: Language = 'pt';
  languages = this.translateService.getLanguages();
  showLgpdModal = signal(false);
  selectedLanguage = 'pt';

  constructor() {
    this.translateService.getCurrentLang().subscribe(lang => {
      this.currentLang = lang;
    });
  }

  // getter para usar no template
  get errorMessage() {
    return this.errorMessageSignal();
  }

  translate(key: string): string {
    return this.translateService.translate(key);
  }

  getCurrentLanguageInfo() {
    return this.languages.find(lang => lang.code === this.currentLang) || this.languages[0];
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen.set(!this.isLanguageMenuOpen());
  }

  changeLanguage() {
    this.translateService.setLanguage(this.selectedLanguage as 'pt' | 'en');
  }

  showLgpdInfo() {
    this.showLgpdModal.set(true);
  }

  closeLgpdModal() {
    this.showLgpdModal.set(false);
  }

  onSubmitLoginForm() {
    const { username, password, lgpd } = this.loginForm.value;

    if (!this.loginForm.valid || !username || !password) {
      this.errorMessageSignal.set(this.translate('login.error.empty'));
      return;
    }

    if (!lgpd) {
      this.errorMessageSignal.set(this.translate('login.error.lgpd'));
      return;
    }

    this.authService.auth({ nome: username, senha: password }).subscribe({
      next: () => {
        this.errorMessageSignal.set("");
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        if (err.status === 401) {
          this.errorMessageSignal.set(this.translate('login.error.invalid'));
        } else if (err.status === 0) {
          this.errorMessageSignal.set('Erro de conexão com o servidor. Verifique se o servidor está rodando.');
        } else {
          this.errorMessageSignal.set(this.translate('login.error.internal'));
        }
      }
    });
  }
}
