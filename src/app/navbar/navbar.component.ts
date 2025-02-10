import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';  // Import the ApiService to fetch data
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,  // Mark as a standalone component
  imports: [  CommonModule, RouterModule
  ],
  providers: [ApiService],  // Provide ApiService here if it's not provided globally
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  users: any[] = [];  // Store users here

  // Inject the ApiService
  constructor(private apiService: ApiService) {}

  // Angular's lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    this.fetchUsers();  // Fetch the users when the component initializes
  }

  // Method to fetch users from the backend
  fetchUsers(): void {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;  // Store the fetched data
      },
      (error) => {
        console.error('Error fetching users:', error);  // Handle any errors
      }
    );
  }
}
