export interface Caste {
    casteId: number;
    categoryId: number;
    categoryName: string;
    caste: string;
    isActive: boolean;
}

export interface CasteResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Caste[];
}

export interface CasteFormValues {
    categoryId: number;
    caste: string;
    isActive: boolean;
}