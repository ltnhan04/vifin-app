import { baseApi } from "@/redux/api/baseApi";
import type { ResponseBudgetType, BudgetType } from "@/types/budget";

export const budgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBudget: builder.mutation<ResponseBudgetType, BudgetType>({
      query: (newBudget) => ({
        url: `/v1/budget`,
        method: "POST",
        body: newBudget,
      }),
    }),
  }),
});

export const { useCreateBudgetMutation } = budgetApi;
