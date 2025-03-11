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
    updateBudget: builder.mutation<
      ResponseBudgetType,
      { id: string; newBudget: Partial<Omit<BudgetType, "_id">> }
    >({
      query: ({ id, newBudget }) => ({
        url: `/v1/budget/${id}`,
        method: "PUT",
        body: newBudget,
      }),
    }),
    // deleteBudget: builder.mutation({

    // })
  }),
});

export const { useCreateBudgetMutation } = budgetApi;
