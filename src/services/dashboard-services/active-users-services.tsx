import axios from 'axios';

interface ActiveUser {
  city: string;
  activeUsers: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: ActiveUser[];
}

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const fetchActiveUsers = async (): Promise<ActiveUser[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${baseUrl}/google-analytic/run-report/param`, {
        params: {
            dimension: 'city',
            metric: 'activeUsers',
            },
    });
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching active users:', error);
    throw error;
  }
};