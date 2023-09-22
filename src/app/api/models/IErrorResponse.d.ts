export interface IErrorResponse {
  status:
    | "error"
    | "forbidden"
    | "unauthenticated"
    | "badRequest"
    | "invalid";
  error: {
    message: string;
    errors?: any;
  };
}
