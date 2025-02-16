// comment-refresh.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentRefreshService {
  private refreshSubject = new Subject<void>();  // Subject to notify subscribers

  refreshComments() {
    this.refreshSubject.next();  // Notify subscribers to refresh
  }

  getRefreshObservable() {
    return this.refreshSubject.asObservable();  // Return observable for subscription
  }
}
