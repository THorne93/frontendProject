import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute to access route parameters

@Component({
  selector: 'app-show-review',
  templateUrl: './show-review.component.html',
  styleUrls: ['./show-review.component.css']
})
export class ShowReviewComponent implements OnInit {

  review: any = {};  // Store the review data

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchReview();  // Fetch the review when the component initializes
  }

  // Method to fetch a specific review from the backend
  fetchReview(): void {
    const reviewId = this.route.snapshot.paramMap.get('id');
    if (reviewId) {
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
