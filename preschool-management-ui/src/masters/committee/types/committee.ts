export interface CommitteeMaster {
    committeeId: string;
    committeeName: string;
    slogan?: string;
    logo?: string;
    logoPath?: string;
    isActive: boolean;
}

export interface CommitteeMasterResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: CommitteeMaster[];
}

export interface CommitteeMasterFormValues {
    committeeName: string;
    slogan?: string;
    isActive: boolean;
    logo?: File | null;
}