import { baseApi } from "@/redux/api/baseApi";
import type {
  ResponseBudgetType,
  BudgetType,
  IResponseBudget,
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
    createBudget: builder.mutation<ResponseBudgetType, Omit<BudgetType, "_id">>(
      {
        query: (newBudget) => ({
          url: `/v1/budget`,
          method: "POST",
          body: newBudget,
        }),
        invalidatesTags: ["Budget"],
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
      invalidatesTags: ["Budget"],
    }),
    deleteBudget: builder.mutation<IResponseBudget, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/budget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget"],
    }),
  }),
});

export const {
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
  useGetBudgetsQuery,
  useUpdateBudgetMutation,
} = budgetApi;
