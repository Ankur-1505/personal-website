import { UserComponent } from './user/user.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { LoginComponent } from './login/login.component';
import { ReadArticleComponent } from './read-article/read-article.component';
import { WriteArticleComponent } from './write-article/write-article.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'write-article',
    component: WriteArticleComponent
  },
  {
    path : 'write-article/:id',
    component: WriteArticleComponent
  },
  {
    path: 'read-article/:id',
    component: ReadArticleComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path: 'user/:id',
    component : UserComponent
  },
  {
    path: 'user-account',
    component : UserAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
