export interface AcademicYear{
    academicYearId:number,
    academicYearName:string,
}

export interface AcademicYearResponse{
    success:boolean,
    message:string,
    statusCode:number,
    data:AcademicYear[]
}