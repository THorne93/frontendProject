import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesaverefreshserviceComponent {
  private refreshSubject = new Subject<void>();  // Subject to notify subscribers

  refreshBar() {
    console.log("🔄 Refresh event triggered!");
    this.refreshSubject.next();  // Notify subscribers
  }
  

  getRefreshObservable() {
    return this.refreshSubject.asObservable();  // Return observable for subscription
  }
}
