export interface Category{
    categoryId:number;
    categoryName:string;
    isActive:boolean;
}

export interface CategoryResponse{
    success:boolean;
    message:string;
    statusCode:number;
    data: Category[];
}

export interface CategoryFormValues{
    categoryName:string;
    isActive:boolean;
}