export interface holiday{
    HolidayId:number;
    HolidayName:string;
    isActive:boolean;
    HolidayDate:Date;
    HolidayType:string;
    Description:string;
}

export interface holidayResponse{
    success:boolean;
    message:string;
    statusCode:number;
    data: holiday[];
}

export interface holidayFormValues{
    HolidayName:string;
    isActive:boolean;
}