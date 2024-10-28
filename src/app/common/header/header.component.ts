import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../core/category/category.service';
import { Category } from '../../core/category/model/category.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  categories!: Category[];

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.list().subscribe({
      next: resp => this.categories = resp,
      error: err => console.log(err)
    });
  }

}
