/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../../utils/axios-interceptor";
import { PreviewDataRequest, PreviewInterface } from "./preview-type";

export const GetReportForPreviewByTimestampBetween = async (
  data: PreviewDataRequest
) => {
  try {
    const res = await axiosInstance.get("/excel/preview", {
      params: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
    return res.data as unknown as PreviewInterface[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
