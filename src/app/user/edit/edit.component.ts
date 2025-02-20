import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  user: any = {};
  selectedUserId: string | null = null;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  router = inject(Router);
  authService = inject(AuthService);

  protected signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {

    this.fetchUser();

  }

  onSubmit() {
    console.log("submitted")
    if (this.signupForm.valid) {
      // Create a new FormData instance
      const updatedUser = {
        id: this.user.id, // Include the ID if needed
        name: this.signupForm.value.name ?? '',
        surnames: this.signupForm.value.surnames ?? '',
        email: this.signupForm.value.email ?? '',
        role: this.signupForm.value.role ?? ''
      };
      this.authService.editUser(updatedUser).subscribe({
        next: (data: any) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error editing user:', err);
        }
      });
    }
  }



  fetchUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.selectedUserId = userId;
      this.apiService.getUser(userId).subscribe(
        (data) => {
          this.user = data;
          this.signupForm.controls['name'].setValue(data.name);
          this.signupForm.controls['surnames'].setValue(data.surnames);
          this.signupForm.controls['email'].setValue(data.email);
          this.signupForm.controls['role'].setValue(data.role);
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }
}
