export interface PreviewDataRequest {
  startDate: string;
  endDate: string;
}

interface DataReportStyles {
  field1: string | Date;
  field2: string | number;
  field3: string | number;
}

export interface PreviewInterface {
  data: DataReportStyles[];
  header: string;
  categories: string[];
}
