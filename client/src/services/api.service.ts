import axios from "axios";
import { ApiResponse } from "../models/apiResponse";

// Create an axios instance
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically adds the access token to the header
apiService.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

/**
 * Fetches cafe dashboard data.
 */
export async function getCafeDashboardData(id: string): Promise<ApiResponse> {
  try {
    const response = await apiService.get(`/cafes/customers`, {
      params: { id },
    });

    // Calculate age and format data
    const result = response.data.map((d: any) => ({
      ...d,
      age: getAge(new Date(d.dob)),
      isSelected: false,
      dob: new Date(d.dob),
    }));

    return { data: result };
  } catch (error: any) {
    throw error;
  }
}

/**
 * Fetches user rewards.
 */
export async function getUserDashboardData(
  userId: string,
  cafeId: string,
): Promise<ApiResponse> {
  try {
    const response = await apiService.get(`/users/rewards`, {
      params: { userId, cafeId },
    });

    return { data: response.data };
  } catch (error: any) {
    throw error;
  }
}

/**
 * Uses a reward.
 */
export async function useReward(id: string): Promise<ApiResponse> {
  try {
    const response = await apiService.post(`/rewards/use`, { id });
    return { data: response.data };
  } catch (error: any) {
    throw error;
  }
}

/**
 * Checks authenticity and fetches reward data.
 */
export async function checkAuthenticityAndGetRewardData(
  userId: string,
  cafeId: string,
  tagId: string | null,
  eCode: string | null,
  enc: string | null,
  cmac: string | null,
): Promise<ApiResponse> {
  try {
    const response = await apiService.get(`/users/scan`, {
      params: { userId, cafeId, tagId, eCode, enc, cmac },
    });

    return { data: response.data };
  } catch (error: any) {
    throw error;
  }
}

/**
 * Helper function to calculate age from a date.
 */
function getAge(date: Date): number {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
}
