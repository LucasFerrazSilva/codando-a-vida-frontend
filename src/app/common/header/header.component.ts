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

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.categoryService.list().subscribe({
      next: resp => this.categories = resp,
      error: err => console.log(err)
    });

    this.loggedUser$ = this.authService.loggedUserSubject.asObservable();
  }

  logout() {
    this.authService.logout();
  }

}
