export interface ISuccessfulResponse<T=unknown> {
    status: "success";
    data: T
  }
  