import { AuthApi } from "@/lib/config/axios.config";
import { error } from "console";
import useSWR from "swr";

export const useAllSchools = () => {
  const { data, isLoading, mutate, error } = useSWR(
    `/schools/all`,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        console.log(response);
        return response.data.data;
      } catch (error) {
        console.log(error);
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
