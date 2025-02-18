import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  imports: [CommonModule,FormsModule],
  standalone: true,
  providers: [ApiService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  sortByFirst: string = '';
  reviews: any[] = [];  // Store users here

  // Inject the ApiService
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchReviews();  // Fetch the users when the component initializes
  }

  // Method to fetch users from the backend
  fetchReviews(): void {
    this.apiService.getReviews().subscribe(
      (data) => {
        this.reviews = data;  // Store the fetched data
      },
      (error) => {
        console.error('Error fetching reviews:', error);  // Handle any errors
      }
    );
  }

  navigateToReview(reviewId: string): void {
    this.router.navigate(['/review', reviewId]);  // Navigate using Router service
  }
}
