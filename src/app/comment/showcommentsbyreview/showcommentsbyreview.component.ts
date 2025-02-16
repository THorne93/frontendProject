import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { LikesavebarComponent } from '../likesavebar/likesavebar.component';
import { CommentRefreshService } from '../../misc/commentrefreshservice/commentrefreshservice.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-showcommentsbyreview',
  templateUrl: './showcommentsbyreview.component.html',
  styleUrls: ['./showcommentsbyreview.component.css'],
  standalone: true,
  imports: [CommonModule, LikesavebarComponent]  // Import any other components you need here
})
export class ShowcommentsbyreviewComponent implements OnInit, OnDestroy {

  @Input() reviewId: string | null = null;  // Accept reviewId as string | null
  comments: any = {};  // Store the review data
  private refreshSubscription: Subscription | undefined;
  constructor(private apiService: ApiService, private commentRefreshService: CommentRefreshService) { }

  ngOnInit(): void {
    this.fetchReviews();
    this.refreshSubscription = this.commentRefreshService.getRefreshObservable().subscribe(() => {
      this.fetchReviews();  // Reload the comments when triggered
    });
  }

  ngOnChanges(): void {
    this.fetchReviews();  // Fetch data if the input changes
  }

  trackByCommentId(index: number, comment: any): any {
    return comment.id;  // Track by comment id to avoid unnecessary re-renders
  }

  ngOnDestroy(): void {
    // Clean up subscription to avoid memory leaks
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
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
