import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../model/post.interface';
import { NewPost } from '../model/new-post.interface';
import { UpdatePost } from '../model/update-post.interface';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/model/category.interface';
import { Editor, NgxEditorModule, toHTML, Toolbar } from 'ngx-editor';


@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxEditorModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  id!: string | null;
  form!: FormGroup;

  categories!: Category[];

  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html = '';

  constructor(
    private service: PostService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {    
    this.editor = new Editor();
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

  ngOnDestroy(): void {
    this.editor.destroy();
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
    dto.body = toHTML(this.form.value['body']);
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
    dto.body = toHTML(this.form.value['body']);
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
