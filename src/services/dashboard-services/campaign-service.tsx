import axios from 'axios';

interface Campaign {
  campaignId: string;
  campaignName : string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: Campaign[];
}

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${baseUrl}/campaign/get-dropdown-campaign`);
    if (response.data.code === 200) {
      return response.data.data; 
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};