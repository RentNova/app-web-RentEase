
export interface Property {
  id: number;
  name: string;
  address: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  image: string;
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  image: string; 
  reviewerImage: string; 
}
