export interface PageResult<T> {
    content: Array<T>;
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
};

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
};

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
};

