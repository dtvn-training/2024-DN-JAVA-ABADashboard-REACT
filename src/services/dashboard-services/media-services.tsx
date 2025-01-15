import axios from 'axios';

interface ApiResponse {
    code: number;
    message: string;
    data: [
        {
            mediumId: string;
            mediumName: string;
        }
    ]
}

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const fetchMedias = async (): Promise<ApiResponse['data']> => {
    try {
        const response = await axios.get<ApiResponse>(`${baseUrl}/medium/get-dropdown-medium`);

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
}
