import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { RegisterComponent } from './core/register/register.component';
import { LoginComponent } from './core/login/login.component';
import { CategoryComponent } from './core/category/category.component';
import { PostComponent } from './core/post/post.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'category/:category', component: CategoryComponent },
    { path: 'post/:post', component: PostComponent },
];
