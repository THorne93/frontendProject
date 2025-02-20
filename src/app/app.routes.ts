import { Routes } from '@angular/router';
import { ShowReviewComponent } from './chips/show-review/show-review.component';
import { NewReviewComponent } from './chips/new-review/new-review.component';
import { EditReviewComponent } from './chips/edit-review/edit-review.component';
import { IndexComponent } from './chips/index/index.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AdminComponent } from './user/admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { ListComponent } from './user/list/list.component';
import { ListReviewComponent } from './chips/list-review/list-review.component';
import { EditComponent } from './user/edit/edit.component';
export const routes: Routes = [
    {path:'',redirectTo: '/home',pathMatch:'full'},
    {path:'login',component: LoginComponent},
    {path:'signup',component: SignupComponent},
    {path:'admin',component: AdminComponent, canActivate: [authGuard]},
    {path: 'home', component: IndexComponent},
    {path: 'review/new', component: NewReviewComponent},
    {path: 'review/:id', component: ShowReviewComponent},
    {path: 'review/:id/edit', component: EditReviewComponent},
    {path: 'admin/users', component: ListComponent},
    {path: 'admin/users/:id/edit', component: EditComponent},
    {path: 'admin/reviews', component: ListReviewComponent}

];
