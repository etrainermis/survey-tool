import { EvaluationStatus } from "@/components/evaluation/common/evaluation-status";
import { AuthApi } from "@/lib/config/axios.config";
import { error } from "console";
import useSWR from "swr";

export const useAllSurveys = (size?: number, page?: number) => {
  const { data, isLoading, mutate, error } = useSWR(
    `/school-survey/all?page=${page ?? 1}&size=${size ?? 1000000}`,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
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
export const useAllCompletedSurveysByLoggedInUser = (size?: number, page?: number) => {
  const { data, isLoading, mutate, error } = useSWR(
    `/school-survey/by-logged-in-user/${EvaluationStatus.COMPLETE}?page=${page ?? 1}&size=${size ?? 1000000}`,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        return response?.data?.data.content;
        
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

export const useAllInCompletedSurveysByLoggedInUser = (size?: number, page?: number) => {
  const { data, isLoading, mutate, error } = useSWR(
    `/school-survey/by-logged-in-user/${EvaluationStatus.INCOMPLETE}?page=${page ?? 1}&size=${size ?? 1000000}`,
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        return response?.data?.data.content;
        
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
