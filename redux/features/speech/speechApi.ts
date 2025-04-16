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
    }),
  }),
});

export const {
  useExpenseClassificationByVoiceMutation,
  useTranscribeAudioMutation,
} = speechApi;
