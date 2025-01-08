import axios from 'axios';

interface ApiResponse {
  code: number;
  message: string;
  data: {
    data: { numberOfEvent: any; eventTable: any; chartEvent: any; };
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
  eventLabel: string,
  mediumName: string | null,
  campaignName: string | null
): Promise<ApiResponse['data']> => {
  try {
    const params: { [key: string]: any } = {
      pageNum,
      pageSize,
      startDate,
      endDate,
      eventLabel,
      mediumName,
    };

    if (mediumName) {
      params.mediumName = mediumName;
    }

    if (campaignName) {
      params.campaignName = campaignName;
    }

    const response = await axios.get<ApiResponse>(`${baseUrl}/google-analytic/get-all-events-by-filter`, {
      params,
    });

    if (!response.data || response.data.code !== 200 || !response.data.data) {
      throw new Error('Invalid API response');
    }

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

