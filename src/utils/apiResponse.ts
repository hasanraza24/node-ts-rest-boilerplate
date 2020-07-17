
export interface IApiResponse {
  error: boolean;
  message: string;
  status: number;
  data: any
}
export class ApiResponse {
  public response: IApiResponse
  constructor(error: boolean, message: string, status: number, data: any) {
    this.response = {
      error,
      message,
      status,
      data
    }
  }
}