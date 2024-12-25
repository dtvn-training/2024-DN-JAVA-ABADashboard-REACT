export interface ISuccessResponse<T> {
    code: number;
    message: string;
    data: T;
  }
  
  export interface IErrorResponse {
    code: number;
    message: string;
  }