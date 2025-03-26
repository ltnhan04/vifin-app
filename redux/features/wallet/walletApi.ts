import { baseApi } from "@/redux/api/baseApi";
import type {
  WalletType,
  ResponseListWallet,
  ResponseWalletType,
  IResponseTransactionByDay,
  IResponseTransactionByMonth,
  IResponseTransactionByYear,
} from "@/types/wallet";
import { getFileInfo } from "@/utils/getFileInfo";

export const walletApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createNewWallet: builder.mutation<ResponseWalletType, WalletType>({
      query: (newWallet) => {
        const formData = new FormData();
        formData.append("wallet_name", newWallet.wallet_name);
        formData.append("currency_unit", newWallet.currency_unit);
        formData.append("amount", newWallet.amount.toString());
        const { fileName, type } = getFileInfo(newWallet.symbol);
        if (newWallet.symbol) {
          formData.append("symbol", {
            uri: newWallet.symbol,
            name: fileName,
            type: type,
          } as any);
        }

        return {
          url: "/v1/wallet/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Wallet", "Budget", "Transaction"],
    }),
    getWallet: builder.query<ResponseWalletType, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/v1/wallet/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Wallet"],
    }),
    getWallets: builder.query<ResponseListWallet, void>({
      query: () => ({
        url: "/v1/wallet",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    getStatisticWeekly: builder.query<
      IResponseTransactionByDay,
      { walletId: string }
    >({
      query: ({ walletId }) => ({
        url: `/v1/wallet/weekly?walletId=${walletId}`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    getStatisticMonthly: builder.query<
      IResponseTransactionByMonth,
      { walletId: string }
    >({
      query: ({ walletId }) => ({
        url: `/v1/wallet/monthly?walletId=${walletId}`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    getStatisticYearly: builder.query<
      IResponseTransactionByYear,
      { walletId: string }
    >({
      query: ({ walletId }) => ({
        url: `/v1/wallet/yearly?walletId=${walletId}`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    updateWallet: builder.mutation<
      ResponseWalletType,
      { id: string; newWallet: Partial<WalletType> }
    >({
      query: ({ id, newWallet }) => {
        const formData = new FormData();
        if (newWallet.wallet_name) {
          formData.append("wallet_name", newWallet.wallet_name);
        }
        if (newWallet.currency_unit) {
          formData.append("currency_unit", newWallet.currency_unit);
        }
        if (newWallet.amount !== undefined) {
          formData.append("amount", newWallet.amount.toString());
        }

        if (newWallet.symbol) {
          const { fileName, type } = getFileInfo(newWallet.symbol);
          formData.append("symbol", {
            uri: newWallet.symbol,
            name: fileName,
            type: type,
          } as any);
        }
        return {
          url: `/v1/wallet/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Wallet", "Budget", "Transaction"],
    }),

    deleteWallet: builder.mutation<ResponseWalletType, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/wallet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wallet", "Budget", "Transaction"],
    }),
  }),
});

export const {
  useCreateNewWalletMutation,
  useGetWalletsQuery,
  useGetWalletQuery,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
  useGetStatisticWeeklyQuery,
  useGetStatisticMonthlyQuery,
  useGetStatisticYearlyQuery,
} = walletApi;
