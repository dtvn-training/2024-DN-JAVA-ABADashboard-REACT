export type GetAllTagsServiceTypes = {
  pageNum: number | null;
  pageSize: number | null;
};

type ParameterTypes = {
  key: string;
  type: string;
};

export type TagResponseTypes = {
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
  parameters: ParameterTypes[];
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  deleteFlag: string | null;
};

export type ListTagResponseTypes = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  data: TagResponseTypes[];
};
