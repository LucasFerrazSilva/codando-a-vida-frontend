import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { RegisterComponent } from './core/register/register.component';
import { LoginComponent } from './core/login/login.component';
import { CategoryComponent } from './core/category/category.component';
import { PostComponent } from './core/post/post.component';
import { CategoryFormComponent } from './core/category/category-form/category-form.component';
import { authGuard } from './auth/auth.guard';
import { PostFormComponent } from './core/post/post-form/post-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'category/:category', component: CategoryComponent },
    { path: 'category-form', component: CategoryFormComponent, canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
    { path: 'category-form/:id', component: CategoryFormComponent, canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
    { path: 'post-form', component: PostFormComponent, canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
    { path: 'post-form/:id', component: PostFormComponent, canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
    { path: 'post/:post', component: PostComponent },
];
