import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CommentRefreshService } from '../../misc/commentrefreshservice/commentrefreshservice.component';

@Component({
  selector: 'app-makecomment',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './makecomment.component.html',
  styleUrl: './makecomment.component.css'
})
export class MakecommentComponent {
  @Input() reviewId: string | null = null;  // Accept reviewId as string | null
  
  authService = inject(AuthService);
  commentForm: FormGroup;

  constructor( private commentRefreshService: CommentRefreshService ) {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }


  public onSubmit() {
    const userId = this.authService.getUserId();
    console.log(userId);
    if (this.commentForm.valid && this.reviewId && userId) {
      console.log("everything valid");
      const formData = new FormData();
      formData.append('comment', this.commentForm.value.comment);
      formData.append('reviewId', this.reviewId);  // Attach review ID
      formData.append('userId', userId); 
      this.authService.makeComment(formData).subscribe(
        (data:any) => {
          this.commentForm.reset();
          this.commentRefreshService.refreshComments();
        },
        (error)=> {
          console.error("error submitting comment");
        }
      )
    }
    else {
      console.log("not valid");

    }
  }
}
