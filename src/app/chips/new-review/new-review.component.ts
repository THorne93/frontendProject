import { AfterViewInit, ChangeDetectorRef, Component, inject, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';  // Import Quill module
import { FormsModule } from '@angular/forms'; // Import FormsModule
import Quill from 'quill'; // Import Quill for direct manipulation

@Component({
  selector: 'app-new-review',
  imports: [ReactiveFormsModule, RouterModule, QuillModule, FormsModule],  // Add FormsModule
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements AfterViewInit, OnChanges {
  authService = inject(AuthService);
  router = inject(Router);
  cdr: ChangeDetectorRef;
  selectedFile: File | null = null;

  // Reactive form setup for the review
  reviewForm: FormGroup;

  // Quill config
  quillConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ]
  };

  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef | null = null;

  editor: Quill | undefined;

  constructor(cdr: ChangeDetectorRef) {
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

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit triggered");

    // Add a small timeout to ensure DOM is ready
    setTimeout(() => {
      this.initializeQuillEditor();
      this.cdr.detectChanges(); // Forces Angular to detect changes after initializing Quill
    }, 100); // Adjust the timeout as needed
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If form changes occur, we may need to reinitialize Quill editor
    if (changes['reviewForm'] && !this.editor) {
      this.initializeQuillEditor();
    }
  }

  // Initialize the Quill editor
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

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the file separately
      console.log("Selected file:", this.selectedFile.name); // Debugging log
    } else {
      console.warn("No file selected!");
    }
  }

  onSubmit(): void {
    // if (this.reviewForm.valid) {
    const formData = new FormData();
    let reviewContent = this.reviewForm.value.review;

    // Replace all instances of &nbsp; with a regular space
    reviewContent = reviewContent.replace(/&nbsp;/g, ' ');
    // Append review data as JSON
    formData.append('reviewData', new Blob([JSON.stringify({
      title: this.reviewForm.value.title,
      name: this.reviewForm.value.name,
      address: this.reviewForm.value.address,
      rating: this.reviewForm.value.rating,
      review: reviewContent
    })], { type: 'application/json' }));

    // Append the image file
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
      console.log("Image appended:", this.selectedFile.name);
    } else {
      console.warn("No image selected!");
    }

    // Submit the form data
    this.authService.submitReview(formData).subscribe(
      (data: any) => {
        console.log("Review submitted successfully!");
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error("Error submitting review:", error);
      }
    );
    //  } else {
    //    console.log("Form is invalid!");
    //}
  }

}
