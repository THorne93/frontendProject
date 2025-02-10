import { Routes } from '@angular/router';
import { ShowReviewComponent } from './chips/show-review/show-review.component';
import { IndexComponent } from './chips/index/index.component';
export const routes: Routes = [

    {path: '', component: IndexComponent},
    {path: 'review/:id', component: ShowReviewComponent}
];
