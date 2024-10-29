import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from './model/category.interface';
import { NewCategory } from './model/new-category.interface';
import { BehaviorSubject } from 'rxjs';
import { UpdateCategory } from './model/update-category.interface';

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

  findByName(name: string | null) {
    return this.http.get<Category>(`${BASE_URL}/find-by-name/${name}`);
  }

  findById(id: string) {
    return this.http.get<Category>(`${BASE_URL}/${id}`);
  }

  create(dto: NewCategory) {
    return this.http.post<Category>(BASE_URL, dto);
  }

  update(id: string | null, dto: UpdateCategory) {
    return this.http.put<Category>(`${BASE_URL}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

}
