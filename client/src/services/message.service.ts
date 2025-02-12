import apiService from "./api.service";
import { ApiResponse } from "../models/apiResponse";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export async function getCafeDashboardData(
  token: any,
  id: any,
): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/cafes/customers`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  };

  function getAge(date: Date) {
    var today = new Date();
    var age = today.getFullYear() - date.getFullYear();
    var m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  }

  const { data, error } = (await apiService({ config })) as ApiResponse;

  const result: any[] = data.map((d: any) => {
    const temp: any = d as any;
    const date = new Date(d.dob);

    temp.age = getAge(date);
    temp.isSelected = false;
    temp.dob = date;

    return temp;
  });

  return {
    data: result,
    error,
  };
}

export async function getUserDashboardData(
  token: any,
  userId: any,
  cafeId: any,
): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/users/rewards`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId,
      cafeId,
    },
  };

  const { data, error } = (await apiService({ config })) as ApiResponse;

  return {
    data,
    error,
  };
}

export async function useReward(token: any, id: any): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/rewards/use`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      id,
    },
  };

  const { data, error } = (await apiService({ config })) as ApiResponse;

  return {
    data,
    error,
  };
}

export async function checkAuthenticityAndGetRewardData(
  token: any,
  userId: any,
  cafeId: any,
  tagId: any,
  eCode: any,
  enc: any,
  cmac: any,
): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/users/scan`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId,
      cafeId,
      tagId,
      eCode,
      enc,
      cmac,
    },
  };

  const { data, error } = (await apiService({ config })) as ApiResponse;

  return {
    data,
    error,
  };
}
