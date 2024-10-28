import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post } from './model/post.interface';

const BASE_URL = environment.BACKEND_URL + "/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Post[]>(BASE_URL);
  }

  findByCategory(categoryPath: string | null) {
    return this.http.get<Post[]>(`${BASE_URL}/find-by-category/${categoryPath}`);
  }

  findByPath(path: string | null) {
    return this.http.get<Post>(`${BASE_URL}/find-by-path/${path}`);
  }

}
