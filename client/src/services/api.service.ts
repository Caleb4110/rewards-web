import axios from "axios";
import { ApiResponse } from "../models/apiResponse";
import { AxiosResponse } from "axios";

export default async function apiService(options: {
  config: any;
}): Promise<ApiResponse> {
  try {
    const response: AxiosResponse = await axios(options.config);
    const { data } = response;
    return {
      data,
      error: null,
    };
  } catch (err: any) {
    if (!err.response) {
      return { data: null, error: err };
    }

    return {
      data: null,
      error: err.response.data,
    };
  }
}
