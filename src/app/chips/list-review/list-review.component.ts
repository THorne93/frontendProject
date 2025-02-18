import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-review',
  imports: [CommonModule],
  templateUrl: './list-review.component.html',
  styleUrl: './list-review.component.css'
})
export class ListReviewComponent implements OnInit {
  reviews: any[] = [];
  constructor(private apiService: ApiService) {}

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
}
