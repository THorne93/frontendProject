import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterLink } from '@angular/router';
import {routes} from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Use the routes from app.routes.ts
    provideHttpClient(),   // Enables HTTP Services
  ],
}).catch(err => console.error(err));