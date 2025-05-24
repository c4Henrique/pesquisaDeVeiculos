import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal<boolean>(false);
  private currentUser = signal<string | null>(null);

  constructor() {
    // Verifica se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser.set(savedUser);
      this.isAuthenticated.set(true);
    }
  }

  login(username: string): void {
    this.currentUser.set(username);
    this.isAuthenticated.set(true);
    localStorage.setItem('currentUser', username);
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getCurrentUser(): string | null {
    return this.currentUser();
  }

  getUserName(): string {
    return this.currentUser() || '';
  }
} 