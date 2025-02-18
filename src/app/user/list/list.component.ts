import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  users: any[] = [];
  constructor(private apiService: ApiService) { }
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

}
