import { Component } from '@angular/core';
import { PostService } from './post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from './model/post.interface';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  post!: Post;

  isAdmin = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    authService: AuthService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.postService.findByPath(params.get('post')).subscribe({
        next: resp => this.post = resp,
        error: err => console.log(err)
      });

      this.isAdmin = authService.isAdmin();
    });
  }

  edit() {
    this.router.navigate(['post-form', this.post.id]);
  }

  delete() {
    this.postService.delete(this.post?.id).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: err => console.log(err)
    });
  }

}
