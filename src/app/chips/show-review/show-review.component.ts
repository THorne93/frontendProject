import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';  
import { ShowcommentsbyreviewComponent } from '../../comment/showcommentsbyreview/showcommentsbyreview.component';

@Component({
  selector: 'app-show-review',
  templateUrl: './show-review.component.html',
  styleUrls: ['./show-review.component.css'],
  standalone: true,
  imports: [ShowcommentsbyreviewComponent]  // Import the child component
})
export class ShowReviewComponent implements OnInit {

  review: any = {};  // Store the review data
  selectedReviewId: string | null = null;  // Store the reviewId to pass to ShowComponent

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchReview();  // Fetch the review when the component initializes
  }

  // Method to fetch a specific review from the backend
  fetchReview(): void {
    const reviewId = this.route.snapshot.paramMap.get('id');
    if (reviewId) {
      this.selectedReviewId = reviewId;  // Store the reviewId to pass to child component
      this.apiService.getReview(reviewId).subscribe(
        (data) => {
          this.review = data;
          console.log(this.review);  // Check the structure of the fetched review data
        },
        (error) => {
          console.error('Error fetching review:', error);
        }
      );
    }
  }
}
