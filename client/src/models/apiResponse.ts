import { AppError } from "./appError";
import { Message } from "./message";

export interface ApiResponse {
  data: any | null;
  error: AppError | null;
}
