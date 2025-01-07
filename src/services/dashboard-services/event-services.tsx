import axios from 'axios';

interface ApiResponse {
  code: number;
  message: string;
  data: {
    numberOfEvent: { eventTitle: string; totalValue: number }[]  | null;
    eventTable: {
      links: { rel: string; href: string }[] | null;
      content: { eventName: string; totalValue: number }[] | null;
      page: { size: number; totalElements: number; totalPages: number; number: number } | null;
    };
    chartEvent: { time: string; eventTitle: string; eventValue: number }[] | null;
  };
}

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const fetchEvents = async (
  pageNum: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  eventLabel: string
): Promise<ApiResponse['data']> => {
  try {

    console.log('fetchEvents', pageNum, pageSize, startDate, endDate, eventLabel);

    const response = await axios.get<ApiResponse>(`${baseUrl}/google-analytic/get-all-events-by-time`, {
      params: {
        eventLabel,
        pageNum,
        pageSize,
        startDate,
        endDate,
      },
    });

    if (!response.data || response.data.code !== 200 || !response.data.data) {
      throw new Error('Invalid API response');
    }
    console.log('fetchEvents response:', response.data.data);
    return response.data.data;

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'API call failed');
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};
