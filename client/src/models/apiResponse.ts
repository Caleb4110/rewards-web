import { AppError } from "./appError";
import { Message } from "./message";

export interface ApiResponse {
  data: Message | null;
  error: AppError | null;
}
