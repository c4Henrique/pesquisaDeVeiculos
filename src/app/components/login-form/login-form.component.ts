import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  errorMessage = signal<string>('');
  showLgpdModal = signal<boolean>(false);
  showPassword: boolean = false;

  languages = [
    { code: 'pt-BR', name: 'Português' },
    { code: 'en', name: 'English' }
  ];

  languageControl = new FormControl('pt-BR');

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      lgpd: [false, [Validators.requiredTrue]]
    });
  }

  onSubmitLoginForm() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      if (username === 'admin' && password === '123456') {
        this.authService.login(username);
        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set('Usuário ou senha inválidos');
      }
    }
  }

  changeLanguage() {
    // Implementar mudança de idioma
    console.log('Idioma alterado para:', this.languageControl.value);
  }

  translate(key: string): string {
    // Implementar tradução
    const translations: { [key: string]: string } = {
      'login.title': 'Bem-vindo',
      'login.subtitle': 'Faça login para acessar o sistema',
      'login.username': 'Usuário',
      'login.username_placeholder': 'Digite seu nome',
      'login.password': 'Senha',
      'login.password_placeholder': 'Digite sua senha',
      'login.lgpd.accept': 'Aceito os termos de privacidade',
      'login.lgpd.learn_more': 'Saiba mais',
      'login.submit': 'Entrar',
      'login.lgpd.title': 'Termos de Privacidade',
      'login.lgpd.description': 'Ao utilizar nosso sistema, você concorda com nossa política de privacidade.',
      'login.lgpd.rights.title': 'Seus direitos incluem:',
      'login.lgpd.rights.access': 'Acesso aos seus dados',
      'login.lgpd.rights.correction': 'Correção de dados',
      'login.lgpd.rights.deletion': 'Exclusão de dados',
      'login.lgpd.rights.portability': 'Portabilidade de dados',
      'login.lgpd.rights.restriction': 'Restrição de processamento',
      'login.lgpd.rights.objection': 'Oposição ao processamento',
      'login.lgpd.contact': 'Para mais informações, entre em contato conosco.',
      'login.lgpd.close': 'Fechar'
    };

    return translations[key] || key;
  }

  closeLgpdModal() {
    this.showLgpdModal.set(false);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }
}
