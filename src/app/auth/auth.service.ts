import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage()); // Initialize with stored user
  user$ = this.userSubject.asObservable(); // Observable to subscribe to in components
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/';
  router = inject(Router);

  constructor() {
    // You can add additional logic here if needed
  }

  // Helper method to get user from localStorage
  private getUserFromStorage(): any {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  }

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
    return this.userSubject.getValue() !== null; // Check the userSubject state directly
  }

  getUserId() {
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      try {
        const user = JSON.parse(authUser);
        return user.id;
      } catch (error) {
        console.error("Error parsing authUser from localStorage:", error);
        return null;
      }
    }
    return null;
  }


  submitReview(data: FormData) {
    return this.httpClient.post(`${this.baseUrl}reviews/new`, data, {
      headers: {
        // DO NOT set Content-Type manually. The browser will set it to multipart/form-data.
      }
    });
  }
  makeComment(data: FormData) {
    return this.httpClient.post(`${this.baseUrl}comments/new`, data, {
      headers: {
      }
    });
  }

  updateInteraction(userId: string, commentId: string, action: string) {
    return this.httpClient.put(`${this.baseUrl}usercomments/changeinteraction`, { 
      userId, 
      commentId, 
      change: action 
    }); // RETURN the Observable
  }
  
  saveComment(userId: string, commentId: string) {
    return this.httpClient.post(`${this.baseUrl}usercomments/newsave`, { id_user: userId, id_comment: commentId }); 
}

  
  likeComment(userId: string, commentId: string) {
    return this.httpClient.post(`${this.baseUrl}usercomments/newlike`, { id_user: userId, id_comment: commentId }); 
  }
  
}
