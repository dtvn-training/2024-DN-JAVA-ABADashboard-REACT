export type GetAllTypeTrigger = {
    page: number | null;
    size: number | null;
  };

export type TypeTriggerResponse = {
    triggerTemplateId: number; 
    key: number; 
    displayName: string; 
    vendorTemplatePublicId: string; 
    groupDisplayName: string;
    groupDisplayNameAllEvents: string; 
    groupDisplayNameSomeEvents: string;
};

export type ListTypeTriggerResponse = {
    currentPage: number; 
    totalPages: number; 
    pageSize: number; 
    totalElements: number;
    data: TypeTriggerResponse[];
};
