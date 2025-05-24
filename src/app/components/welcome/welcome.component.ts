import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Container do conteúdo -->
    <div class="content-container" [class.dark-mode]="isDarkMode">
        <div class="welcome-box">
            <div class="header-section">
                <div class="header-content">
                <div class="logo-container">
                    <img src="https://prodb2cuicontentdelivery-d0bbevfjaxfmedda.z01.azurefd.net/b2cui/assets/images/ford-logo.svg" alt="Ford Logo">
                </div>
                    <div class="header-controls">
                        <div class="menu-container">
                            <button class="menu-btn" title="Menu">
                                <i class="bi bi-list"></i>
                            </button>
                        </div>
                        <div class="theme-container">
                            <button class="theme-btn" (click)="toggleDarkMode()" [title]="isDarkMode ? 'Modo Claro' : 'Modo Escuro'">
                                <i class="bi" [class.bi-sun]="!isDarkMode" [class.bi-moon]="isDarkMode"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="welcome-content">
                <h1 class="welcome-title">Olá, {{userName}} 👋</h1>
                <div class="welcome-text">
                    <p>Seja bem-vindo ao sistema inteligente da Ford. Use o menu lateral para navegar pelas funcionalidades disponíveis.</p>
                    <ul>
                        <li> <strong>Monitoramento em Tempo Real:</strong> Acompanhe a localização e status dos veículos em tempo real</li>
                        <li> <strong>Dashboard Analítico:</strong> Visualize métricas importantes e relatórios de desempenho</li>
                        <li> <strong>Gestão de Manutenção:</strong> Controle de serviços e agendamentos de manutenção</li>    
                        <li> <strong>Rastreamento:</strong> Sistema de rastreamento avançado com histórico de rotas</li>
                        <li> <strong>Calculadora de Consumo:</strong> Calcule o consumo de combustível e custos das viagens</li>
                        <li> <strong>Configurações:</strong> Personalize suas preferências e configurações do sistema</li>
                    </ul>
                </div>
                
                <button class="dashboard-btn" (click)="goToDashboard()">
                    <span>Acessar Dashboard</span>
                    <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
  `,
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  userName: string = '';
  isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get user name from auth service
    this.userName = this.authService.getCurrentUser() || 'Usuário';
    
    // Check system dark mode preference
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Listen for system dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.isDarkMode = e.matches;
      this.applyDarkMode();
    });

    // Apply initial dark mode
    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
  }

  private applyDarkMode() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
