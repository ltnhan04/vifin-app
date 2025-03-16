import { baseApi } from "@/redux/api/baseApi";
import { IResponseBill } from "@/types/bill";

export const billApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    expenseClassification: builder.mutation<IResponseBill, { text: string }>({
      query: ({ text }) => {
        return {
          url: `/v1/bill`,
          method: "POST",
          body: { text },
        };
      },
    }),
  }),
});

export const { useExpenseClassificationMutation } = billApi;
