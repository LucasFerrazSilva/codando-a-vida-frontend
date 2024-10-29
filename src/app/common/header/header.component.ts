import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../core/category/category.service';
import { Category } from '../../core/category/model/category.interface';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { LoggedUser } from '../../auth/models/logged-user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  categories!: Category[];
  loggedUser$!: Observable<LoggedUser | null>;
  user: LoggedUser | null = null;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCategories();

    this.categoryService.categoriesChangedSubject.subscribe({ next: () => this.loadCategories() });

    this.authService.loggedUserSubject.subscribe({
      next: resp => this.user = resp,
      error: err => console.log(err)
    });
  }

  loadCategories() {
    this.categoryService.list().subscribe({
      next: resp => this.categories = resp,
      error: err => console.log(err)
    });
  }

  logout() {
    this.authService.logout();
  }

}
