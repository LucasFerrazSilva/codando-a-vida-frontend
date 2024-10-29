import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewCategory } from '../model/new-category.interface';
import { CommonModule } from '@angular/common';
import { UpdateCategory } from '../model/update-category.interface';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {

  id!: string | null;
  form!: FormGroup;

  constructor(
    private service: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.service.findById(this.id).subscribe({
        next: resp => {
          this.form = this.formBuilder.group({
            name: [resp.name, [Validators.required]],
          });
        }
      });
    } else {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
      });
    }

  }

  submit() {
    if (this.id)
      this.update();
    else
      this.create();
  }

  create() {
    const dto = this.form.value as NewCategory;
    this.service.create(dto).subscribe({
      next: resp => {
        this.service.categoriesChangedSubject.next(true);
        this.router.navigate(['category', resp.name]);
      },
      error: err => console.log(err)
    });

  }

  update() {
    const dto = this.form.value as UpdateCategory;
    this.service.update(this.id, dto).subscribe({
      next: resp => {
        this.service.categoriesChangedSubject.next(true);
        this.router.navigate(['category', resp.name]);
      },
      error: err => console.log(err)
    });

  }

}
