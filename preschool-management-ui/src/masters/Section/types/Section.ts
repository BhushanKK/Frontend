export interface Section {
    sectionId:number;
    sectionName:string;
    isActive:boolean;
}

export interface SectionResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Section[];
}

export interface SectionFormValues{
    sectionName:string;
    isActive:boolean;
}