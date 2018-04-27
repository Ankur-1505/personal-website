import { UserComponent } from './user/user.component';
import { ReadArticleComponent } from './read-article/read-article.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DisplaypostsComponent } from './displayposts/displayposts.component';
import { ShareButtonsModule } from '@ngx-share/buttons';


const routes: Routes = [
  { 
    path: 'posts', 
    component: DisplaypostsComponent 
  }, 
  {
    path: 'posts/:category',
    component: DisplaypostsComponent
  },
  {
    path : 'read-article/:id',
    component : ReadArticleComponent
  },
  {
    path: 'user/:id',
    component : UserComponent
  }
  
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    ShareButtonsModule.forRoot()
  ],
  declarations: [
    DisplaypostsComponent,
    ReadArticleComponent,
    UserComponent
  ]
})
export class PostsModule { }
