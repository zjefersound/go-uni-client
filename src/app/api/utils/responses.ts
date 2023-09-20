import { ZodIssue } from "zod";
import { IErrorResponse } from "../models/IErrorResponse";
import { throwResponse } from "./throwResponse";
import { ISuccessfulResponse } from "../models/ISuccessfulResponse";

function error({ message }: { message: string }) {
  const errorResponse: IErrorResponse = {
    status: "error",
    error: { message },
  };
  return throwResponse({ status: 500, response: errorResponse });
}

function unauthenticated() {
  const response: IErrorResponse = {
    status: "unauthenticated",
    error: { message: "User not authenticated" },
  };
  return throwResponse({ status: 401, response });
}

function forbidden() {
  const response: IErrorResponse = {
    status: "forbidden",
    error: { message: "User not allowed" },
  };
  return throwResponse({ status: 403, response });
}

function validation({ errors }: { errors: ZodIssue[] }) {
  const response: IErrorResponse = {
    status: "badRequest",
    error: { message: "Invalid request", errors },
  };
  return throwResponse({ status: 400, response });
}

function success<T = unknown>({ data }: { data: T }) {
  const response: ISuccessfulResponse<T> = {
    status: "success",
    data,
  };

  return throwResponse({ status: 200, response });
}

function created<T = unknown>({ data }: { data: T }) {
  const response: ISuccessfulResponse<T> = {
    status: "success",
    data,
  };

  return throwResponse({ status: 201, response });
}

export const responses = {
  error,
  forbidden,
  unauthenticated,
  validation,
  success,
  created
};
