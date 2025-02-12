import { AuthApi } from "@/lib/config/axios.config";
import { error } from "console";
import useSWR from "swr";

export const useAllSurveys = (size?: number, page?: number) => {
  const { data, isLoading, mutate, error } = useSWR(
    `/school-survey/all?page=${page ?? 1}&size=${size ?? 1000000}`,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        console.log(response);
        return response?.data?.content;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  return {
    surveys: data,
    fetchingSurveys: isLoading,
    errorFetchingSurveys: error,
    mutate,
  };
};
