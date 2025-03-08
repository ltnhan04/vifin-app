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
    }),

    getWallets: builder.mutation<ResponseListWallet, void>({
      query: () => ({
        url: "/v1/wallet",
        method: "GET",
      }),
    }),
    updateWallet: builder.mutation<
      ResponseWalletType,
      { id: string; newWallet: Partial<WalletType> }
    >({
      query: ({ id, newWallet }) => ({
        url: `/v1/wallet/${id}`,
        method: "PUT",
        body: newWallet,
      }),
    }),
    deleteWallet: builder.mutation<ResponseWalletType, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/wallet/${id}`,
        method: "DELETE",
      }),
    }),
    getBudgetInWallet: builder.mutation<
      ResponseBudgetInWallet,
      { walletId: string }
    >({
      query: ({ walletId }) => ({
        url: `/v1/wallet/${walletId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateNewWalletMutation,
  useGetWalletsMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
  useGetBudgetInWalletMutation,
} = walletApi;
