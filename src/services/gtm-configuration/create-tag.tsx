export type CreateTagRequestTypes = {
    tagName: string; 
    tagType: string; 
    positiveTriggerId?: string[] | null; 
    blockingTriggerId?: string[] | null; 
    consentSetting?: TagConsentSetting | null;
    containerId: string; 
    workspaceId: string; 
    status: TagStatus; 
    parameters: ParameterRequestTypes[];
  };
  
  type ParameterRequestTypes = {
    key: string; 
    type: string; 
  };
  
  export type TagConsentSetting = {
    settingType: string; 
    details: string; 
  };
  
  export type TagStatus = 'ACTIVE' | 'INACTIVE';
  
  export type ListCreateTagResponseTypes = {
    currentPage: number; 
    totalPages: number;
    pageSize: number;
    totalElements: number; 
    data: CreateTagResponseTypes[]; 
  };
  
  export type CreateTagResponseTypes = {
    tagId: number; 
    accountId: string; 
    containerId: string; 
    workspaceId: string; 
    consentStatus: string | null; 
    fingerprint: string | null; 
    name: string; 
    path: string | null;
    tagGtmId: string | null;
    tagManagerUrl: string | null; 
    type: string;
    status: string;
    parameters: ParameterRequestTypes[];
    createdAt: string | null;
    updatedAt: string | null; 
    createdBy: string | null; 
    updatedBy: string | null; 
    deleteFlag: string | null; 
  };
  