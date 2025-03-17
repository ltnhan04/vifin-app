import { baseApi } from "@/redux/api/baseApi";
import type { CustomerType, ResponseCustomerType } from "@/types/customer";

export const customerApi = baseApi.injectEndpoints({
  overrideExisting: true,
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
      invalidatesTags: ["Customer"],
    }),
    getCustomer: builder.query<ResponseCustomerType, string>({
      query: (customerId) => ({
        url: `/v1/customer/${customerId}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),
  }),
});

export const {
  useCreateNewCustomerMutation,
  useGetCustomerQuery,
  useLazyGetCustomerQuery,
} = customerApi;
