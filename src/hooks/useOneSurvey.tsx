import { AuthApi } from "@/lib/config/axios.config";
import useSWR from "swr";

export const useOneSurvey = (schoolId: string) => {
  const { data, isLoading, mutate, error } = useSWR(
    schoolId ? `/school-survey/${schoolId}` : null,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        return response?.data;
      } catch (error) {
        console.error("Error fetching survey:", error);
        throw error;
      }
    }
  );

  return {
    survey: data,
    fetchingSurvey: isLoading,
    errorFetchingSurvey: error,
    mutate,
  };
};
