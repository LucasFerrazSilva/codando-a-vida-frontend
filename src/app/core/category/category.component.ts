import { Component } from '@angular/core';
import { Post } from '../post/model/post.interface';
import { PostService } from '../post/post.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Category } from './model/category.interface';
import { CategoryService } from './category.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categoryPath!: string | null;
  category!: Category;
  posts!: Post[];

  isAdmin = false;

  constructor(
    private service: CategoryService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    authService: AuthService
  ) {
    this.route.paramMap.subscribe(params => {
      this.categoryPath = params.get('category');

      this.service.findByName(this.categoryPath).subscribe({
        next: resp => this.category = resp,
        error: err => console.log(err)
      });

      this.postService.findByCategory(this.categoryPath).subscribe({
        next: resp => this.posts = resp,
        error: err => console.log(err)
      });

      this.isAdmin = authService.isAdmin();
    });
  }

  edit() {
    this.router.navigate(['category-form', this.category.id]);
  }

  delete() {
    this.service.delete(this.category?.id).subscribe({
      next: () => {
        this.service.categoriesChangedSubject.next(true);
        this.router.navigate(['']);
      },
      error: err => console.log(err)
    });
  }

}
