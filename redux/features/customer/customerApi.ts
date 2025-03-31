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

    getCustomer: builder.query<ResponseCustomerType, { customerId: string }>({
      query: ({ customerId }) => {
        return {
          url: `/v1/customer/${customerId}`,
          method: "GET",
        };
      },
      providesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<
      ResponseCustomerType,
      { customerId: string; updateData: Partial<Omit<CustomerType, "_id">> }
    >({
      query: ({ customerId, updateData }) => {
        const formData = new FormData();
        if (updateData.full_name)
          formData.append("full_name", updateData.full_name);
        if (updateData.gender) formData.append("gender", updateData.gender);
        if (updateData.avatar) {
          formData.append("avatar", updateData.avatar);
        }

        return {
          url: `/v1/customer/${customerId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useCreateNewCustomerMutation,
  useGetCustomerQuery,
  useLazyGetCustomerQuery,
  useUpdateCustomerMutation,
} = customerApi;
