import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { LoginRequest, LoginResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'token';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap((response: any) => {
          if (response.success && response.data) {
            localStorage.setItem(this.tokenKey, response.data.token);
            localStorage.setItem('role', response.data.role);
            this.userSubject.next(response.data);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'ADMIN';
  }

  getCurrentUser(): any {
    return this.userSubject.value;
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    if (token) {
      const payload = this.parseJwt(token);
      if (payload) {
        this.userSubject.next({
          username: payload.sub,
          fullName: payload.fullName || payload.sub,
          email: payload.email,
          role: payload.role || 'USER'
        });
      }
    }
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }
}
