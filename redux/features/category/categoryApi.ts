import { baseApi } from "@/redux/api/baseApi";
import {
  IResponseCategory,
  ICategoryChildren,
  IResponseChildrenCategory,
} from "@/types/category";
import { getFileInfo } from "@/utils/getFileInfo";

export const categoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategories: builder.query<IResponseCategory, void>({
      query: () => ({
        url: `/v1/category`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query<IResponseChildrenCategory, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/category/${id}`,
        method: "GET",
      }),
    }),
    searchCategoryByName: builder.mutation<IResponseCategory, { name: string }>(
      {
        query: ({ name }) => ({
          url: `/v1/category/search?q=${name}`,
          method: "GET",
        }),
      }
    ),
    createCategory: builder.mutation<
      IResponseChildrenCategory,
      Omit<ICategoryChildren, "_id">
    >({
      query: (newCategory) => {
        const formData = new FormData();
        formData.append("name", newCategory.name);
        formData.append("createdBy", newCategory.createdBy || "system");
        if (newCategory.symbol) {
          const { fileName, type } = getFileInfo(newCategory.symbol);
          formData.append("symbol", {
            uri: newCategory.symbol,
            name: fileName,
            type: type,
          } as any);
        }
        formData.append("transaction_type", newCategory.transaction_type);
        if (newCategory.parent_id) {
          formData.append("parent_id", newCategory.parent_id);
        }

        return {
          url: `/v1/category`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Category", "Budget", "Transaction"],
    }),
    updateCategory: builder.mutation<
      IResponseChildrenCategory,
      { id: string; categoryData: Partial<Omit<ICategoryChildren, "_id">> }
    >({
      query: ({ id, categoryData }) => {
        const formData = new FormData();
        if (categoryData.name) {
          formData.append("name", categoryData.name);
        }
        if (categoryData.transaction_type) {
          formData.append("transaction_type", categoryData.transaction_type);
        }
        if (categoryData.parent_id) {
          formData.append("parent_id", categoryData.parent_id);
        }

        if (categoryData.symbol) {
          const { fileName, type } = getFileInfo(categoryData.symbol);
          formData.append("symbol", {
            uri: categoryData.symbol,
            name: fileName,
            type: type,
          } as any);
        }
        return {
          url: `/v1/category/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Category", "Budget", "Transaction"],
    }),
    deleteCategory: builder.mutation<IResponseChildrenCategory, { id: string }>(
      {
        query: ({ id }) => ({
          url: `/v1/category/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Category", "Budget", "Transaction"],
      }
    ),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useSearchCategoryByNameMutation,
} = categoryApi;
