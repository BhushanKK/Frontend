export interface religion{
    religionId:number;
    religionName:string;

}

export interface religionResponse{
    success:boolean;
    message:string;
    statusCode:number;
    data: religion[];
}

export interface religionFormValues{
    religionName:string;
  
}