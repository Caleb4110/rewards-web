import apiService from "./api.service";
import { ApiResponse } from "../models/apiResponse";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export async function getCafeDashboardData(
  token: any,
  cafeId: any,
): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/cafes/customers`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      cafeId,
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

  console.log(data);
  if (!data) {
    return {
      data,
      error,
    };
  }
  const dataArr = JSON.parse(data.text);

  const result: any[] = dataArr.map((d: any) => {
    const temp: any = d as any;
    const date = new Date(d.dob);

    temp.age = getAge(date);
    temp.isSelected = false;
    temp.dob = date;

    return temp;
  });
  const text = JSON.stringify(result);
  return {
    data: { text },
    error,
  };
}

export async function getPublicResource(): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await apiService({ config })) as ApiResponse;

  return {
    data,
    error,
  };
}

export async function getProtectedResource(token: any): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/challenges`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data, error } = (await apiService({ config })) as ApiResponse;

  return {
    data,
    error,
  };
}

export async function getAdminResource(): Promise<ApiResponse> {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await apiService({ config })) as ApiResponse;

  return {
    data,
    error,
  };
}
