import axios from 'axios';
import { format } from 'date-fns';

interface ApiResponse {
  code: number;
  message: string;
  data: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    data: Event[] | null;
  };
}

interface Event {
  eventId: number;
  eventName: string;
  eventLabel: string;
  eventValue: string;
}

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const fetchEvents = async  (pageNum: number, pageSize: number, startDate: string, endDate: string): Promise<ApiResponse['data']> => {
  try {
    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

    const response = await axios.get<ApiResponse>(`${baseUrl}/google-analytic/get-all-events-by-time`, {
      params: {
        eventLabel: 'eventName',
        pageNum,
        pageSize,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
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