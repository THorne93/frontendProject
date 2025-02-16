import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';  
import { ShowcommentsbyreviewComponent } from '../../comment/showcommentsbyreview/showcommentsbyreview.component';
import { MakecommentComponent } from '../../comment/makecomment/makecomment.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-review',
  templateUrl: './show-review.component.html',
  styleUrls: ['./show-review.component.css'],
  standalone: true,
  imports: [ShowcommentsbyreviewComponent, MakecommentComponent, CommonModule]  // Import the child component
})
export class ShowReviewComponent implements OnInit {
  user: any = null;
  review: any = {};  // Store the review data
  private userSubscription: Subscription | undefined;
  selectedReviewId: string | null = null;  // Store the reviewId to pass to ShowComponent

  constructor(private apiService: ApiService, private route: ActivatedRoute,private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;  // Update the user data whenever it changes
    });
    this.fetchReview();  // Fetch the review when the component initializes
    console.log(this.review.id);
    
  }

  // Method to fetch a specific review from the backend
  fetchReview(): void {
    const reviewId = this.route.snapshot.paramMap.get('id');
    if (reviewId) {
      this.selectedReviewId = reviewId;  // Store the reviewId to pass to child component
      this.apiService.getReview(reviewId).subscribe(
        (data) => {
          this.review = data;
        },
        (error) => {
          console.error('Error fetching review:', error);
        }
      );
    }
  }

  navigateToEdit(reviewId: string): void {
    this.router.navigate(['/review', reviewId, 'edit']);
  }
}
