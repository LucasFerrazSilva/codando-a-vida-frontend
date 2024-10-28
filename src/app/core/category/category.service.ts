import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from './model/category.interface';

const BASE_URL = environment.BACKEND_URL + "/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Category[]>(BASE_URL);
  }

}
