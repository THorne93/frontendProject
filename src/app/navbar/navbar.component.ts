import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';  // Import the ApiService to fetch data
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs'; // Import Subscription to unsubscribe later

@Component({
  selector: 'app-navbar',
  standalone: true,  // Mark as a standalone component
  imports: [CommonModule, RouterModule],
  providers: [ApiService],  // Provide ApiService here if it's not provided globally
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any = null;
  private userSubscription: Subscription | undefined;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;  // Update the user data whenever it changes
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout(); 
  }
}
