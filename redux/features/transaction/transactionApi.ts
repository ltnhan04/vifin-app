import { baseApi } from "@/redux/api/baseApi";
import {
  IResponseRecentTransaction,
  IResponseTransactionByDay,
  IResponseTransactionByMonth,
  IResponseTransactionByYear,
} from "@/types/transaction";

export const transactionApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
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
} = transactionApi;
