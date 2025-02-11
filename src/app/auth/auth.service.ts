import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); // Holds the current user data
  user$ = this.userSubject.asObservable(); // Observable to subscribe to in components
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/';
  router = inject(Router);

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}users/new`, data);
  }

  login(data: any) {
    return this.httpClient.post<{ result: string }>(
      `${this.baseUrl}users/authenticate`, 
      data, 
      { withCredentials: true }
    ).pipe(
      switchMap(response => {
        if (response.result === "ok") {
          return this.httpClient.get(`${this.baseUrl}users/who`, { withCredentials: true });
        }
        throw new Error("Authentication failed");
      }),
      tap(userResponse => {
        if (userResponse) {
          localStorage.setItem("authUser", JSON.stringify(userResponse)); // Store user info
          this.userSubject.next(userResponse); // Emit new user data
        }
      }),
      catchError(error => {
        console.error("Error fetching user:", error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem('authUser');
    this.userSubject.next(null); // Emit null when logged out
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  constructor() {}
}
