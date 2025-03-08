import { baseApi } from "@/redux/api/baseApi";
import type { CustomerType, ResponseCustomerType } from "@/types/customer";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewCustomer: builder.mutation<
      ResponseCustomerType,
      Omit<CustomerType, "customerId">
    >({
      query: (newCustomer) => ({
        url: "/v1/customer/",
        method: "POST",
        body: newCustomer,
      }),
    }),
    getCustomer: builder.query<ResponseCustomerType, string>({
      query: (customerId) => ({
        url: `/v1/customer/${customerId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateNewCustomerMutation,
  useGetCustomerQuery,
  useLazyGetCustomerQuery,
} = customerApi;
