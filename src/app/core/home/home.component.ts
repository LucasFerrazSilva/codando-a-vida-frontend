import { Component } from '@angular/core';
import { PostService } from '../post/post.service';
import { Post } from '../post/model/post.interface';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  posts!: Post[];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.list().subscribe({
      next: resp => this.posts = resp,
      error: err => console.log(err)
    });
  }

}
