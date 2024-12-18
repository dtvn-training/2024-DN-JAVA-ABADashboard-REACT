import axios from "axios";
import { ISuccessResponse } from "../../components/responses-type/response-type";
import { GetAllTagsServiceTypes, ListTagResponseTypes } from "./gtm-config-type";

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const GetAllTagsService = async (request: GetAllTagsServiceTypes) => {
  try {
    const res = await axios.get(`${baseUrl}/google-tag-manager/list-tag`, {
      params: {
        pageNum: request.pageNum,
        pageSize: request.pageSize,
      },
    });
    if (res.status === 200) {
      return res.data as ISuccessResponse<ListTagResponseTypes>;
    } else {
      throw new Error("Error retrieving tags");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
