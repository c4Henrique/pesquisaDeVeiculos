import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Verificar se há um usuário salvo no localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.isAuthenticatedSubject.next(true);
        this.usernameSubject.next(user.nome);
      }
    }
  }

  auth(credentials: { nome: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Se chegou aqui, significa que a autenticação foi bem sucedida
        this.isAuthenticatedSubject.next(true);
        this.usernameSubject.next(response.nome);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify({ nome: response.nome }));
        }
      }),
      catchError((error) => {
        console.error('Erro na autenticação:', error);
        throw error;
      })
    );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next('');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }
}
