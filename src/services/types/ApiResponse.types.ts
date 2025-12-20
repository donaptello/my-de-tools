export interface ApiResponse<T> {
    statusCode: number;
    messages: string;
    timeExecution: number;
    data: T;
}