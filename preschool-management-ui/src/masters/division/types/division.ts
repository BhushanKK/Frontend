export interface division {
    divisionId:number;
    divisionName:string;
    isActive:boolean;
}

export interface divisionResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: division[];
}

export interface divisionFormValues{
    divisionName:string;
    isActive:boolean;
}