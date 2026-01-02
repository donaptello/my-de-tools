export interface ApiResponse<T> {
    statusCode: number;
    messages: string;
    timeExecution: number;
    data: T;
}

export interface ApiResponseInserted {
    statusCode: number;
    messages: string;
    timeExecution: number;
}