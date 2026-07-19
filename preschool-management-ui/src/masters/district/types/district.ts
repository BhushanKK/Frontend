export interface district {
    districtId:number;
    districtName:string;
    isActive:boolean;
}

export interface districtResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: district[];
}

export interface districtFormValues{
    districtName:string;
    isActive:boolean;
}