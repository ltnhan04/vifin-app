import { baseApi } from "@/redux/api/baseApi";
import type {
  WalletType,
  ResponseListWallet,
  ResponseWalletType,
  ResponseBudgetInWallet,
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
      invalidatesTags: ["Wallet", "Budget"],
    }),
    getWallet: builder.query<ResponseWalletType, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/wallet/${id}`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    getWallets: builder.query<ResponseListWallet, void>({
      query: () => ({
        url: "/v1/wallet",
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
      invalidatesTags: ["Wallet", "Budget"],
    }),

    deleteWallet: builder.mutation<ResponseWalletType, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/wallet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wallet", "Budget"],
    }),
  }),
});

export const {
  useCreateNewWalletMutation,
  useGetWalletsQuery,
  useGetWalletQuery,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
} = walletApi;
