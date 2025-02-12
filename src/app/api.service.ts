// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // This allows us to make HTTP requests
import { Observable } from 'rxjs';  // This is used to handle the asynchronous nature of HTTP requests

@Injectable({
    providedIn: 'root',  // This makes the service available throughout the app
})
export class ApiService {
    // Inject HttpClient into the service
    constructor(private http: HttpClient) { }

    // Define a method to fetch users from the API
    getUsers(): Observable<any> {
        // Make a GET request to your backend API
        return this.http.get('http://localhost:8080/users/all');  // Adjust this URL based on your backend's endpoint
    }

    getReviews(): Observable<any> {
        return this.http.get('http://localhost:8080/reviews/all');
    }
    getReview(id: string): Observable<any> {
        return this.http.post('http://localhost:8080/reviews/getone', { id });
    }
    getCommentsByReview(id: string): Observable<any> {
        return this.http.post('http://localhost:8080/comments/getallbyreview', { id });
    }
    getUserCommentInteractionsByComment(commentId: string): Observable<any> {
        return this.http.post('http://localhost:8080/usercomments/getallbycomment', {commentId});
    }

    
}
