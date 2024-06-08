export interface Property {
    id: number;
    name: string;
    address: string;
    status: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    image: string;
    reviews: { rating: number; comment: string; }[];
  }