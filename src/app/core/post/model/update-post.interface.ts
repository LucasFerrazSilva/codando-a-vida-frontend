import { Category } from "../../category/model/category.interface";

export interface UpdatePost {
    path: string,
    title: string,
    body: string,
    category: Category
}