export interface BoardTranslation {
    languageCode: string;
    boardName: string;
}

export interface Board {
    boardId: number;
    boardName: string;
    isActive: boolean;
    translations: BoardTranslation[];
}

export interface BoardResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Board[];
}

export interface BoardFormValues {
    boardName: string;
    isActive: boolean;
    translations: BoardTranslation[];
}