import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: Translations = {
    pt: {
      'login.title': 'Login',
      'login.username': 'Usuário',
      'login.password': 'Senha',
      'login.submit': 'Entrar',
      'login.error': 'Usuário ou senha inválidos',
      'login.error.empty': 'Por favor, preencha todos os campos.',
      'login.error.invalid': 'Usuário ou senha inválidos.',
      'login.error.internal': 'Erro interno. Tente novamente mais tarde.',
      'login.error.lgpd': 'Você precisa aceitar os termos de privacidade para continuar.',
      'login.lgpd.accept': 'Eu aceito os termos de privacidade e proteção de dados.',
      'login.lgpd.learn_more': 'Saiba mais',
      'login.lgpd.title': 'Política de Privacidade e Proteção de Dados',
      'login.lgpd.description': 'A Ford está comprometida com a proteção de seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
      'login.lgpd.rights': 'Você tem os seguintes direitos:',
      'login.lgpd.rights.access': 'Acesso aos seus dados pessoais',
      'login.lgpd.rights.correction': 'Correção de dados incompletos ou desatualizados',
      'login.lgpd.rights.deletion': 'Exclusão de dados pessoais',
      'login.lgpd.rights.portability': 'Portabilidade dos dados',
      'login.lgpd.rights.restriction': 'Restrição do processamento',
      'login.lgpd.rights.objection': 'Oposição ao processamento',
      'login.lgpd.contact': 'Para exercer seus direitos, entre em contato com nosso DPO:',
      'login.lgpd.email': 'dpo@ford.com',
      'user.welcome': 'Bem-vindo',
      'user.profile': 'Perfil',
      'user.settings': 'Configurações',
      'user.logout': 'Sair',
      'profile.title': 'Perfil do Usuário',
      'profile.personal_info': 'Informações Pessoais',
      'profile.name': 'Nome',
      'profile.security': 'Segurança',
      'profile.password': 'Senha',
      'profile.change_password': 'Alterar Senha',
      'settings.title': 'Configurações',
      'settings.appearance': 'Aparência',
      'settings.theme': 'Tema',
      'settings.theme_description': 'Escolha entre o tema claro ou escuro',
      'settings.light_theme': 'Claro',
      'settings.dark_theme': 'Escuro',
      'settings.language': 'Idioma',
      'settings.select_language': 'Selecione o idioma',
      'settings.language_description': 'Escolha o idioma da interface',
      'settings.portuguese': 'Português',
      'settings.english': 'English',
      'calculator.title': 'Calculadora de Consumo',
      'calculator.description': 'Calcule o custo da sua viagem com base na distância, consumo e preço do combustível.',
      'calculator.distance': 'Distância',
      'calculator.consumption': 'Consumo',
      'calculator.price': 'Preço do Combustível',
      'calculator.result': 'Custo Total',
      'calculator.result_description': 'Valor total gasto com combustível para a viagem',
      'home.title': 'Bem-vindo ao Sistema Ford',
      'home.description': 'Gerencie sua frota de veículos, acompanhe o consumo de combustível e calcule custos de forma simples e eficiente.',
      'home.calculator': 'Calculadora de Consumo',
      'home.dashboard': 'Dashboard',
      'home.features.vehicles.title': 'Gestão de Veículos',
      'home.features.vehicles.description': 'Cadastre e gerencie sua frota de veículos com facilidade.',
      'home.features.analytics.title': 'Análises Detalhadas',
      'home.features.analytics.description': 'Acompanhe o desempenho e consumo dos seus veículos com gráficos e relatórios.',
      'home.features.calculator.title': 'Calculadora de Custos',
      'home.features.calculator.description': 'Calcule o custo das suas viagens com base no consumo e preço do combustível.',
    },
    en: {
      'login.title': 'Login',
      'login.username': 'Username',
      'login.password': 'Password',
      'login.submit': 'Sign In',
      'login.error': 'Invalid username or password',
      'login.error.empty': 'Please fill in all fields.',
      'login.error.invalid': 'Invalid username or password.',
      'login.error.internal': 'Internal error. Please try again later.',
      'login.error.lgpd': 'You must accept the privacy terms to continue.',
      'login.lgpd.accept': 'I accept the privacy and data protection terms.',
      'login.lgpd.learn_more': 'Learn more',
      'login.lgpd.title': 'Privacy and Data Protection Policy',
      'login.lgpd.description': 'Ford is committed to protecting your personal data in accordance with the General Data Protection Law (LGPD).',
      'login.lgpd.rights': 'You have the following rights:',
      'login.lgpd.rights.access': 'Access to your personal data',
      'login.lgpd.rights.correction': 'Correction of incomplete or outdated data',
      'login.lgpd.rights.deletion': 'Deletion of personal data',
      'login.lgpd.rights.portability': 'Data portability',
      'login.lgpd.rights.restriction': 'Restriction of processing',
      'login.lgpd.rights.objection': 'Objection to processing',
      'login.lgpd.contact': 'To exercise your rights, contact our DPO:',
      'login.lgpd.email': 'dpo@ford.com',
      'user.welcome': 'Welcome',
      'user.profile': 'Profile',
      'user.settings': 'Settings',
      'user.logout': 'Logout',
      'profile.title': 'User Profile',
      'profile.personal_info': 'Personal Information',
      'profile.name': 'Name',
      'profile.security': 'Security',
      'profile.password': 'Password',
      'profile.change_password': 'Change Password',
      'settings.title': 'Settings',
      'settings.appearance': 'Appearance',
      'settings.theme': 'Theme',
      'settings.theme_description': 'Choose between light or dark theme',
      'settings.light_theme': 'Light',
      'settings.dark_theme': 'Dark',
      'settings.language': 'Language',
      'settings.select_language': 'Select language',
      'settings.language_description': 'Choose the interface language',
      'settings.portuguese': 'Portuguese',
      'settings.english': 'English',
      'calculator.title': 'Fuel Consumption Calculator',
      'calculator.description': 'Calculate your trip cost based on distance, consumption and fuel price.',
      'calculator.distance': 'Distance',
      'calculator.consumption': 'Consumption',
      'calculator.price': 'Fuel Price',
      'calculator.result': 'Total Cost',
      'calculator.result_description': 'Total amount spent on fuel for the trip',
      'home.title': 'Welcome to Ford System',
      'home.description': 'Manage your vehicle fleet, track fuel consumption and calculate costs in a simple and efficient way.',
      'home.calculator': 'Consumption Calculator',
      'home.dashboard': 'Dashboard',
      'home.features.vehicles.title': 'Vehicle Management',
      'home.features.vehicles.description': 'Register and manage your vehicle fleet with ease.',
      'home.features.analytics.title': 'Detailed Analytics',
      'home.features.analytics.description': 'Track your vehicles performance and consumption with graphs and reports.',
      'home.features.calculator.title': 'Cost Calculator',
      'home.features.calculator.description': 'Calculate your trip costs based on consumption and fuel price.',
    }
  };

  private currentLang$ = new BehaviorSubject<Language>('pt');

  constructor() {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      this.setLanguage(savedLang);
    }
  }

  getCurrentLang() {
    return this.currentLang$.asObservable();
  }

  setLanguage(lang: Language) {
    this.currentLang$.next(lang);
    localStorage.setItem('language', lang);
  }

  translate(key: string): string {
    const lang = this.currentLang$.value;
    return this.translations[lang]?.[key] || key;
  }

  getLanguages() {
    return [
      { code: 'pt', name: 'Português' },
      { code: 'en', name: 'English' }
    ];
  }
} 