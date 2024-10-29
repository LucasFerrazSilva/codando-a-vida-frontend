import { Category } from "../../category/model/category.interface";

export interface NewPost {
    path: string,
    title: string,
    body: string,
    category: Category
}