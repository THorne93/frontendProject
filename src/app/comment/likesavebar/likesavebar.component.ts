import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { LikesaverefreshserviceComponent } from '../../misc/likesaverefreshservice/likesaverefreshservice.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-likesavebar',
  imports: [CommonModule],
  templateUrl: './likesavebar.component.html',
  styleUrl: './likesavebar.component.css'
})
export class LikesavebarComponent implements OnInit, OnDestroy {  // Implement OnInit & OnDestroy
  @Input() commentId: string | null = null;
  likeCount: number = 0;
  saveCount: number = 0;
  likedByUser: boolean = false;
  savedByUser: boolean = false;
  interactions: any[] = [];
  authService = inject(AuthService);

  private refreshSubscription: Subscription | undefined;  // Subscription reference

  constructor(
    private apiService: ApiService,
    private likesaverefresh: LikesaverefreshserviceComponent,
    private cdr: ChangeDetectorRef  // Add this
  ) {}

  ngOnInit(): void {
    this.fetchInteractions();

    // Subscribe to refresh events
    this.refreshSubscription = this.likesaverefresh.getRefreshObservable().subscribe(() => {
      this.fetchInteractions();
    });
  }

  fetchInteractions(): void {
    const userId = this.authService.getUserId();
    if (!this.commentId || !userId) return;
  
    this.apiService.getUserCommentInteractionsByComment(this.commentId).subscribe(
      (data) => {
        this.interactions = data || [];
  
        // Reset values
        this.likeCount = 0;
        this.likedByUser = false;
        this.saveCount = 0;
        this.savedByUser = false;
  
        this.interactions.forEach((interaction: any) => {
          if (interaction.liked) this.likeCount++;
          if (interaction.saved) this.saveCount++;
          if (interaction.id_user == userId) {
            this.likedByUser = interaction.liked;
            this.savedByUser = interaction.saved;
          }
        });
  
        this.cdr.detectChanges();  // Force UI update
      },
    );
  }
  


  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
  

  onSave() {
    const userId = this.authService.getUserId();
    if (!this.commentId || !userId) {
      console.error("Error: commentId or userId is null");
      return; // Exit the function early if either value is null
    }
    const commentId = this.commentId;
    
    this.apiService.getUserCommentInteractionsByCommentAndUser(commentId, userId)
      .subscribe(
        (response: any) => {
          if (response.result === "true") {
            this.authService.updateInteraction(userId, commentId, 'saved')
              .subscribe(() => this.likesaverefresh.refreshBar()); // Wait before refreshing
          } else {
            this.authService.saveComment(userId, commentId)
              .subscribe(() => this.likesaverefresh.refreshBar()); // Wait before refreshing
          }
        },
        (error) => {
          console.error("Error fetching interaction:", error);
        }
      );
  }
  
  onLike() {
    const userId = this.authService.getUserId();
    if (!this.commentId || !userId) {
      console.error("Error: commentId or userId is null");
      return; // Exit the function early if either value is null
    }
    const commentId = this.commentId;
  
    this.apiService.getUserCommentInteractionsByCommentAndUser(commentId, userId)
      .subscribe(
        (response: any) => {
          if (response.result === "true") {
            console.log("The interaction exists");
            this.authService.updateInteraction(userId, commentId, 'liked')
              .subscribe(() => this.likesaverefresh.refreshBar()); // Wait before refreshing
          } else {
            console.log("The interaction doesn't exist");
            this.authService.likeComment(userId, commentId)
              .subscribe(() => this.likesaverefresh.refreshBar()); // Wait before refreshing
          }
        },
        (error) => {
          console.error("Error fetching interaction:", error);
        }
      );
  }
  
}
