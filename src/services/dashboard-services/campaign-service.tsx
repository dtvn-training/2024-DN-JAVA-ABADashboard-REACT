import axios from 'axios';

interface Campaign {
  campaignId: number;
  campaignName: string;
  budget: number;
  campaignStartDate: string;
  campaignEndDate: string;
  targetAudience: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    data: Campaign[];
  };
}

const baseUrl: string = import.meta.env.VITE_APP_URL_BACKEND;

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${baseUrl}/campaign/get-dropdown-campaign`);
    if (response.data.code === 200) {
      return response.data.data.data; 
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};