import { NextResponse } from "next/server";

interface IApiResponse {
  status: number; 
  response: any;
}
export function throwResponse({ status, response }: IApiResponse) {
  return new NextResponse(JSON.stringify(response), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}