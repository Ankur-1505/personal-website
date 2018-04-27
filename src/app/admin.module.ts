import { UserAccountComponent } from './user-account/user-account.component';
import { WriteArticleComponent } from './write-article/write-article.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxEditorModule } from 'ngx-editor';


const routes: Routes = [
  {
    path: 'write-article',
    component: WriteArticleComponent
  },
  {
    path : 'write-article/:id',
    component: WriteArticleComponent
  },
  {
    path: 'user-account',
    component : UserAccountComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    NgxEditorModule
  ],
  declarations: [
    WriteArticleComponent,
    UserAccountComponent
  ]
})
export class AdminModule { }
