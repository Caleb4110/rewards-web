import { AppError } from "./appError";

export interface ApiResponse {
  data: any | null;
  error: AppError | null;
}
