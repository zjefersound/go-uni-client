import { NextResponse } from "next/server";
import { IApiResponse } from "../models/IApiResponse";

export function throwResponse({ status, response }: IApiResponse) {
  return new NextResponse(JSON.stringify(response), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}