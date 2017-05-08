import * as express from "express";
export interface IQuery{
    fields?:string|string[],
    table:string,
    conditions?:IConditions|IConditions[],
    conditions_op?:string,
    order?:IOrder|IOrder[],
    limit?:ILimit
}
export interface IQueryInsert{
    table:string,
    data:IMysqlData,
    duplicate?:IDuplicate,
}
export interface IQueryUpdate{
    table:string,
    data:IMysqlData,
    conditions?:IMysqlData,
}
export interface IQueryDelete{
    table:string,
    conditions:IMysqlData,
}
export interface IConditions{
    field:string,
    op:string,
    value:any
}
export interface IOrder{
    field:string,
    order:string
}
export interface ILimit{
    start:number,
    interval:number
}
export interface IMysqlData{
    [key:string]:string|number
}
export interface IDuplicate{
    [key:string]:string|number
}
export interface IResponse  {
    status:number,
    body:IMessageResponse
}
export interface IMessageResponse {
    code:string,
    message:string
    data?:any
}
export interface IResult {
    err:null|any,
    ret:null|any
}

export interface IReq extends express.Request{}
export interface IRes extends express.Response{}
export interface INext extends express.NextFunction{}
