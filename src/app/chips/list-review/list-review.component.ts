import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-review',
  imports: [CommonModule],
  templateUrl: './list-review.component.html',
  styleUrl: './list-review.component.css'
})
export class ListReviewComponent implements OnInit {
  reviews: any[] = [];
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

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
  navigateToEdit(reviewId: string): void {
    this.router.navigate(['/review', reviewId, 'edit']);
  }

  delete(reviewId: string): void {
    this.apiService.deleteReview(reviewId).subscribe(
      (data) => {
        this.fetchReviews();
      },
      (error) => {

      }
    );
  }
}
