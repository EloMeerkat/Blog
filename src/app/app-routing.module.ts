import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './article/article.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'articles', component: ArticleComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'articles/:category', component: ArticleComponent }
];

@NgModule({
  exports:[ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
