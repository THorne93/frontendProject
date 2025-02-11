import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'; // Import Subscription to unsubscribe later

@Component({
  selector: 'app-likesavebar',
  imports: [CommonModule],
  templateUrl: './likesavebar.component.html',
  styleUrl: './likesavebar.component.css'
})
export class LikesavebarComponent {
  @Input() commentId: string | null = null;
  likeCount: number = 0;
  saveCount: number = 0;
  interactions: any[] = [];
  private hasFetchedInteractions = false; 
  private userSubscription: Subscription | undefined;
 // private numLikes: number;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
      this.fetchInteractions();
    
  }
  
  private interactionSubscriptions: Subscription[] = [];

  fetchInteractions(): void {
    if (!this.commentId) return;
    console.log('Fetching interactions for reviewId:', this.commentId);
  
    this.apiService.getUserCommentInteractionsByComment(this.commentId).subscribe(
      (data) => {
        // Check if the data is not null and not an empty array
        if (data && data.length > 0) {
          this.interactions = data;
          this.likeCount = 0;
          this.interactions.forEach((interaction: any) => {
            if (interaction.liked === true) {
              this.likeCount++;
            }
          });
          this.saveCount = 0;
          this.interactions.forEach((interaction: any) => {
            if (interaction.saved === true) {
              this.saveCount++;
            }
          });
        } else {
          console.log('No interactions found for this comment.');
          this.interactions = [];  // Ensure interactions is an empty array if no data
        }
      },
      (error) => {
        console.error('Error fetching interactions:', error);
      }
    );
  }


}  