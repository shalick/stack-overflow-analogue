export interface ResponseWithData<T> {
    data: T;
}

export interface QueryResponse<T> {
    data: QueryResponseData<T>;
}

export interface QueryResponseData<T> extends ResponseWithData<T> {
    meta: QueryResponseMeta;
}

export interface QueryResponseMeta {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: string[];
}

export interface ResponseWithMessage<T> extends ResponseWithData<T> {
    message: string;
}