import { baseApi } from "@/redux/api/baseApi";
import { IResponseCategorized } from "@/types/voice";

export const speechApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    transcribeAudio: builder.mutation<
      IResponseCategorized,
      { audioUrl: string; audioConfig: any }
    >({
      query: ({ audioUrl, audioConfig }) => {
        return {
          url: `/v1/speech/transcribe`,
          method: "POST",
          body: { audioUrl, audioConfig },
        };
      },
      invalidatesTags: ["Budget", "Transaction", "Wallet"],
    }),
    expenseClassificationByVoice: builder.mutation<
      IResponseCategorized,
      { text: string }
    >({
      query: ({ text }) => {
        return {
          url: `/v1/speech`,
          method: "POST",
          body: { text },
        };
      },
      invalidatesTags: ["Budget", "Transaction", "Wallet"],
    }),
  }),
});

export const {
  useExpenseClassificationByVoiceMutation,
  useTranscribeAudioMutation,
} = speechApi;
