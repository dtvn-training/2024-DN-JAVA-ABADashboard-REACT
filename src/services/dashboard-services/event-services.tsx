import axios from 'axios';

interface ApiResponse {
  code: number;
  message: string;
  data: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    data: Event[];
  };
}

interface Event {
  eventId: number;
  eventName: string;
  eventLabel: string;
  eventValue: string;
}

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const fetchEvents = async (pageNum: number, pageSize: number): Promise<ApiResponse['data']> => {
  try {
    const response = await axios.get<ApiResponse>(`${baseUrl}/google-analytic/get-all-events`, {
      params: {
        eventLabel: 'eventName',
        pageNum,
        pageSize,
      },
    });
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};