import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  imports: [CommonModule, FormsModule],
  standalone: true,
  providers: [ApiService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  sortByFirst: string = 'date';
  dateSortOrder: string = 'newest';
  scoreSortOrder: string = 'highest';
  reviews: any[] = [];  // Store users here

  // Inject the ApiService
  constructor(private apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchReviews();  // Fetch the users when the component initializes
    this.sortList();
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

  sortList(): void {
    if (this.scoreSortOrder === 'highest') {
      this.reviews.sort((a, b) => b.rating - a.rating);  // Sort by highest score first
    } else {
      this.reviews.sort((a, b) => a.rating - b.rating);  // Sort by lowest score first
    }
    this.cdr.detectChanges();
  }


  onSortChange(): void {
    this.sortList();
    console.log(this.reviews);
  }

  navigateToReview(reviewId: string): void {
    this.router.navigate(['/review', reviewId]);  // Navigate using Router service
  }
}
