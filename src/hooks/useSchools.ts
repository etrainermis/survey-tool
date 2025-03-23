import { AuthApi } from "@/lib/config/axios.config";
import useSWR from "swr";

export const useAllSchools = () => {
  const { data, isLoading, mutate, error } = useSWR(
    `/schools/all`,
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
    schools: data,
    fetchingSchools: isLoading,
    errorFetchingSchools: error,
    mutate,
  };
};

export const useSchoolsByDistrict = (districtId: string | null) => {
  const { data, isLoading, error } = useSWR(
    districtId ? `/schools/district/${districtId}` : null,
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
    schools: data,
    isLoading,
    error,
  };
};

export const useSchoolsById = (id: string | null) => {
  const { data, isLoading, error } = useSWR(
    id ? `/schools/${id}` : null,
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
    schools: data,
    isLoading,
    error,
  };
};