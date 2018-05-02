import { UserAccountComponent } from './user-account/user-account.component';
import { LoginComponent } from './login/login.component';
import { WriteArticleComponent } from './write-article/write-article.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

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
    loadChildren: './posts.module#PostsModule'
  },
  {
    path: 'admin',
    loadChildren: './admin.module#AdminModule'
  },
  {
    path: 'auth',
    loadChildren: './auth.module#AuthModule'
  }
];

@NgModule({
<<<<<<< HEAD
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
=======
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
>>>>>>> bd9f8cb4c23ae2c2b8497b756dfe9815a74b6118
  exports: [RouterModule]
})
export class AppRoutingModule { }
