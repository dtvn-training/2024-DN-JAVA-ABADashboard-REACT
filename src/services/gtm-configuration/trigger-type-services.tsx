import axios from "axios";
import {GetAllTypeTrigger} from "./get-type-trigger";


const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const GetAllTypeTriggers = async (request: GetAllTypeTrigger) => {
  try {
    const res = await axios.get(`${baseUrl}/google-trigger-manager/list-trigger`, {
      params: {
        page: request.page,
        size: request.size
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Error retrieving tags");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};