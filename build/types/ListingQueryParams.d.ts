export interface ListingQueryParams {
    limit?: string;
    offset?: string;
    city?: string;
    startDate?: string;
    endDate?: string;
    minPrice?: string;
    maxPrice?: string;
}

export interface ListingQuery {
    'adress.city'?: string;
    createdAt?: {
        $gte?: Date;
        $lte?: Date;
    };
    price?: {
        $gte?: number;
        $lte?: number;
    };
    [key: string]: any;
}