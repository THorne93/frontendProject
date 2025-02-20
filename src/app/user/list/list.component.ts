import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  users: any[] = [];
  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.fetchUsers();
    
  }

  fetchUsers(): void {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToEdit(userId: string): void {
    this.router.navigate(['/admin/users', userId, 'edit']);
  }

  delete(reviewId: string): void {
    this.apiService.deleteUser(reviewId).subscribe(
      (data) => {
        this.fetchUsers();
      },
      (error) => {

      }
    );
  }

}
