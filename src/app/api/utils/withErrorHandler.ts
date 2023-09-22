import { responses } from "./responses";

export function withErrorHandler(callback: Function) {
  try {
    return callback();
  } catch (error: any) {
    return responses.error({ message: error.message });
  }
}