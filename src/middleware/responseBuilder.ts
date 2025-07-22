import { SuccessResponse } from "../entities/entities";

export const successResponse = <T = any>(
  message: string,
  data?: T
): SuccessResponse<T> => ({
  success: true,
  message,
  data: data !== undefined ? data : (null as unknown as T),
});
