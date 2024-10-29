import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../model/post.interface';
import { NewPost } from '../model/new-post.interface';
import { UpdatePost } from '../model/update-post.interface';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/model/category.interface';


@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  id!: string | null;
  form!: FormGroup;

  categories!: Category[];

  constructor(
    private service: PostService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.categoryService.list().subscribe({
      next: resp => this.categories = resp,
      error: err => console.log(err)
    });

    if (this.id) {
      this.service.findById(this.id).subscribe({ next: resp => this.createForm(resp) });
    } else {
      this.createForm();
    }
  }

  createForm(post: Post | null = null) {
    this.form = this.formBuilder.group({
      path: [post?.path, [Validators.required]],
      title: [post?.title, [Validators.required]],
      body: [post?.body, [Validators.required]],
      category: [post?.categoryDTO?.id, [Validators.required]],
    });
  }

  submit() {
    if (this.id)
      this.update();
    else
      this.create();
  }

  create() {
    const dto = this.form.value as NewPost;
    dto.category = {
      id: this.form.value['category']
    } as Category;
    this.service.create(dto).subscribe({
      next: resp => {
        this.router.navigate(['']);
      },
      error: err => console.log(err)
    });

  }

  update() {
    const dto = this.form.value as UpdatePost;
    dto.category = {
      id: this.form.value['category']
    } as Category;
    this.service.update(this.id, dto).subscribe({
      next: resp => {
        this.router.navigate(['']);
      },
      error: err => console.log(err)
    });

  }

}
