import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '../../service/translate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Container do conteúdo -->
    <div class="content-container">
        <div class="welcome-box">
            <div class="header-section">
                <div class="logo-container">
                    <img src="https://prodb2cuicontentdelivery-d0bbevfjaxfmedda.z01.azurefd.net/b2cui/assets/images/ford-logo.svg" alt="Ford Logo">
                </div>
                <div class="logout-container">
                    <button class="close-btn" (click)="logOut()" title="Sair">×</button>
                </div>
            </div>

            <div class="welcome-content">
                <h1 class="welcome-title">Olá, admin 👋</h1>
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
export class WelcomeComponent {
  private router = inject(Router);
  private translateService = inject(TranslateService);

  goToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
