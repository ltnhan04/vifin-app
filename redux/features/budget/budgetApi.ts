import { baseApi } from "@/redux/api/baseApi";
import type {
  ResponseBudgetType,
  BudgetType,
  IResponseBudget,
  IResponseGetBudgetByRepeatType,
} from "@/types/budget";

export const budgetApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBudgets: builder.query<IResponseBudget, void>({
      query: () => ({
        url: `/v1/budget`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    getBudgetById: builder.query<ResponseBudgetType, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/budget/${id}`,
        method: "GET",
      }),
    }),
    getBudgetByRepeatType: builder.query<
      IResponseGetBudgetByRepeatType,
      { walletId: string; repeat_type: string }
    >({
      query: ({ walletId, repeat_type }) => ({
        url: `/v1/budget/filter?walletId=${walletId}&repeat_type=${repeat_type}`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    createBudget: builder.mutation<ResponseBudgetType, Omit<BudgetType, "_id">>(
      {
        query: (newBudget) => ({
          url: `/v1/budget`,
          method: "POST",
          body: newBudget,
        }),
        invalidatesTags: ["Budget", "Transaction"],
      }
    ),
    updateBudget: builder.mutation<
      ResponseBudgetType,
      { id: string; newBudget: Partial<Omit<BudgetType, "_id">> }
    >({
      query: ({ id, newBudget }) => ({
        url: `/v1/budget/${id}`,
        method: "PUT",
        body: newBudget,
      }),
      invalidatesTags: ["Budget", "Transaction"],
    }),
    deleteBudget: builder.mutation<IResponseBudget, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/budget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget", "Transaction"],
    }),
  }),
});

export const {
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
  useGetBudgetsQuery,
  useUpdateBudgetMutation,
  useGetBudgetByRepeatTypeQuery,
  useGetBudgetByIdQuery,
} = budgetApi;
