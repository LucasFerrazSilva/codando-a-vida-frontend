import { Component } from '@angular/core';
import { PostService } from './post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from './model/post.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  post!: Post | null;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.postService.findByPath(params.get('post')).subscribe({
        next: resp => this.post = resp,
        error: err => console.log(err)
      });
    });
  }

}
