import { Routes } from '@angular/router';
import { ShowReviewComponent } from './chips/show-review/show-review.component';
import { IndexComponent } from './chips/index/index.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AdminComponent } from './user/admin/admin.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path:'',redirectTo: '/login',pathMatch:'full'},
    {path:'login',component: LoginComponent},
    {path:'signup',component: SignupComponent},
    {path:'admin',component: AdminComponent, canActivate: [authGuard]},
    {path: 'home', component: IndexComponent},
    {path: 'review/:id', component: ShowReviewComponent}
];
