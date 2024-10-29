import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post } from './model/post.interface';
import { NewPost } from './model/new-post.interface';
import { UpdatePost } from './model/update-post.interface';

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

  findById(id: string) {
    return this.http.get<Post>(`${BASE_URL}/${id}`);
  }

  create(dto: NewPost) {
    return this.http.post<Post>(BASE_URL, dto);
  }

  update(id: string | null, dto: UpdatePost) {
    return this.http.put<Post>(`${BASE_URL}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

}
