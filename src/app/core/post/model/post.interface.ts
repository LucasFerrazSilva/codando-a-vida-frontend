import { Category } from "../../category/model/category.interface";

export interface Post {
    id: number;
    path: string;
    title: string;
    body: string;
    categoryDTO: Category;
}