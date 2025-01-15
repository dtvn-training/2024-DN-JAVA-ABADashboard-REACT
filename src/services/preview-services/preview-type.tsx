export interface PreviewDataRequest{
    startDate: '',
    endDate: ''
}

interface DataReportStyles {
    dateEventOccurred: Date;
    title: string | number;
    value: string |number;
}

export interface PreviewInterface{
    data: DataReportStyles[],
    header: string;
    categories: string[];
}