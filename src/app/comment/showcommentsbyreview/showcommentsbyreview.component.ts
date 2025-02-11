import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { LikesavebarComponent } from '../likesavebar/likesavebar.component';

@Component({
  selector: 'app-showcommentsbyreview',
  templateUrl: './showcommentsbyreview.component.html',
  styleUrls: ['./showcommentsbyreview.component.css'],
  standalone: true,
  imports: [CommonModule, LikesavebarComponent]  // Import any other components you need here
})
export class ShowcommentsbyreviewComponent implements OnInit {

  @Input() reviewId: string | null = null;  // Accept reviewId as string | null
  comments: any = {};  // Store the review data

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

  ngOnChanges(): void {
    this.fetchReviews();  // Fetch data if the input changes
  }

  trackByCommentId(index: number, comment: any): any {
    return comment.id;  // Track by comment id to avoid unnecessary re-renders
  }

  fetchReviews(): void {
    if (!this.reviewId) return; // Ensure reviewId is set before fetching

    this.apiService.getCommentsByReview(this.reviewId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
