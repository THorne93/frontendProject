import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authService  =  inject(AuthService);
  router  =  inject(Router);

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required])
  })

  public onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (err) => console.log(err)
      });
    }
  }

}
