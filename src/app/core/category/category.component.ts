import { Component } from '@angular/core';
import { Post } from '../post/model/post.interface';
import { PostService } from '../post/post.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categoryPath!: string | null;
  posts!: Post[];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.categoryPath = params.get('category');
      this.postService.findByCategory(this.categoryPath).subscribe({
        next: resp => this.posts = resp,
        error: err => console.log(err)
      });
    });
  }

}
