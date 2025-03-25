import { AuthApi } from "@/lib/config/axios.config";
import useSWR, { mutate } from "swr";

export const useProvinces = () => {
  const { data, isLoading, error } = useSWR(
    `/location-address/provinces`,
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
    provinceId ? `/location-address/districts/${provinceId}` : null,
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
    mutate
  };
};

export const useAllDistricts = () => {
  const { data, isLoading, mutate, error } = useSWR(
    '/location-address/districts',
    async (url) => {
      try {
        const response = await AuthApi.get(url);        
        return response.data.content;
      } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
      }
    }
  );

  return {
    districts: data,
    fetchingDistricts: isLoading,
    errorFetchingDistricts: error
  };
};