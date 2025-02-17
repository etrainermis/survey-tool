import { AuthApi } from "@/lib/config/axios.config";
import useSWR from "swr";

export const useProvinces = () => {
  const { data, isLoading, error } = useSWR(
    `/locations/provinces`,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );

  return {
    provinces: data,
    isLoading,
    error,
  };
};

export const useDistricts = (provinceId: string | null) => {
  const { data, isLoading, error } = useSWR(
    provinceId ? `/locations/districts/${provinceId}` : null,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );

  return {
    districts: data,
    isLoading,
    error,
  };
};