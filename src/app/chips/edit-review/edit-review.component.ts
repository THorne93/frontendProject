import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'app-edit-review',
  imports: [ReactiveFormsModule, RouterModule, QuillModule, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.css'
})
export class EditReviewComponent {
  review: any = {};  // Store the review data
  private userSubscription: Subscription | undefined;
  selectedReviewId: string | null = null;
  reviewForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  cdr: ChangeDetectorRef;

  quillConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ]
  };

  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef | null = null;

  editor: Quill | undefined;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private route: ActivatedRoute, cdr: ChangeDetectorRef) {
    this.cdr = cdr;

    // Initialize the form with title and description form controls
    this.reviewForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      review: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

    this.fetchReview();

  }

  private initializeQuillEditor(): void {
    if (this.editorContainer && !this.editor) {
      try {
        this.editor = new Quill(this.editorContainer.nativeElement, {
          modules: this.quillConfig,
          theme: 'snow',
        });
      } catch (error) {
        console.error("Error initializing Quill editor:", error);
      }
    } else {
      console.error("Quill editor container not found or already initialized!");
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];  // ✅ Store the file for upload
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImage = e.target?.result ?? null;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  fetchReview(): void {
    const reviewId = this.route.snapshot.paramMap.get('id');
    if (reviewId) {
      this.selectedReviewId = reviewId;  
      this.apiService.getReview(reviewId).subscribe(
        (data) => {
          this.review = data;
          this.reviewForm.controls['title'].setValue(data.title);
          this.reviewForm.controls['name'].setValue(data.name);
          this.reviewForm.controls['address'].setValue(data.address);
          this.reviewForm.controls['review'].setValue(data.review);
          this.reviewForm.controls['rating'].setValue(data.rating ?? 0);
        },
        (error) => {
          console.error('Error fetching review:', error);
        }
      );
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    let reviewContent = this.reviewForm.value.review;
  
    // Replace all instances of &nbsp; with a regular space
    reviewContent = reviewContent.replace(/&nbsp;/g, ' ');
    // Append review data as JSON
    formData.append('reviewData', new Blob([JSON.stringify({
      id: this.review.id,
      title: this.reviewForm.value.title,
      name: this.reviewForm.value.name,
      address: this.reviewForm.value.address,
      rating: parseFloat(this.reviewForm.value.rating),
      review: reviewContent
    })], { type: 'application/json' }));
  
  
    // Append the image file if selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
    }
  
    // Send the form data to the server
    this.authService.editReview(formData).subscribe(
      (data: any) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error("Error submitting review:", error);
      }
    );
  }
  
}
