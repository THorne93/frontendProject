import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule for routing
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule here
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ApiService } from './api.service';  // Import ApiService
import { IndexComponent } from './chips/index/index.component';  // Import IndexComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,HttpClientModule, RouterModule],  // Add RouterModule here
  providers: [ApiService],  // Provide the ApiService globally
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chip Advisor';
  
}
