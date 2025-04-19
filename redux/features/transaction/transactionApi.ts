import { baseApi } from "@/redux/api/baseApi";
import {
  IResponseRecentTransaction,
  IResponseTransactionByDay,
  IResponseTransactionByMonth,
  IResponseTransactionByYear,
  INewTransaction,
  IResponseNewTransaction,
  ITransaction,
  IResponseEditTransaction,
} from "@/types/transaction";

export const transactionApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createTransaction: builder.mutation<
      IResponseNewTransaction,
      INewTransaction
    >({
      query: (newTransaction) => ({
        url: `/v1/transactions`,
        method: "POST",
        body: newTransaction,
      }),
      invalidatesTags: ["Wallet", "Transaction", "Budget"],
    }),
    updateTransaction: builder.mutation<
      IResponseNewTransaction,
      { id: string; updateTransaction: Partial<ITransaction> }
    >({
      query: ({ id, updateTransaction }) => ({
        url: `/v1/transactions/${id}`,
        method: "PUT",
        body: updateTransaction,
      }),
      invalidatesTags: ["Budget", "Transaction", "Wallet"],
    }),
    deleteTransaction: builder.mutation<
      IResponseNewTransaction,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/v1/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget", "Transaction", "Wallet"],
    }),
    recentTransaction: builder.query<
      IResponseRecentTransaction,
      { walletId: string; type: string; limit: number }
    >({
      query: ({ walletId, type, limit }) => {
        return {
          url: `/v1/transactions?walletId=${walletId}&type=${type}&limit=${limit}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),
    getDetailsTransaction: builder.query<
      IResponseEditTransaction,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/v1/transactions/${id}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    getTransactionByWeek: builder.query<
      IResponseTransactionByDay,
      { walletId: string; type: string }
    >({
      query: ({ walletId, type }) => ({
        url: `/v1/transactions/weekly?walletId=${walletId}&type=${type}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    getTransactionByMonth: builder.query<
      IResponseTransactionByMonth,
      { walletId: string; type: string }
    >({
      query: ({ walletId, type }) => ({
        url: `/v1/transactions/monthly?walletId=${walletId}&type=${type}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    getTransactionByYear: builder.query<
      IResponseTransactionByYear,
      { walletId: string; type: string }
    >({
      query: ({ walletId, type }) => ({
        url: `/v1/transactions/yearly?walletId=${walletId}&type=${type}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  useRecentTransactionQuery,
  useGetTransactionByWeekQuery,
  useGetTransactionByMonthQuery,
  useGetTransactionByYearQuery,
  useGetDetailsTransactionQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
