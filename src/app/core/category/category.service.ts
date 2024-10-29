import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from './model/category.interface';
import { NewCategory } from './model/new-category.interface';
import { BehaviorSubject } from 'rxjs';

const BASE_URL = environment.BACKEND_URL + "/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoriesChangedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Category[]>(BASE_URL);
  }

  create(dto: NewCategory) {
    return this.http.post<Category>(BASE_URL, dto);
  }

}
