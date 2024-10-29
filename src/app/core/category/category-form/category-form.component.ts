import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { NewCategory } from '../model/new-category.interface';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {


  form!: FormGroup;

  constructor(
    private service: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  submit() {
    const dto = this.form.value as NewCategory;
    this.service.create(dto).subscribe({
      next: resp => {
        this.service.categoriesChangedSubject.next(true);
        this.router.navigate(['category', resp.name]);
      },
      error: err => console.log(err)
    });
  }

}
