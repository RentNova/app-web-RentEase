export interface ReviewResponse{
    id: number,
    userid: number,
    rating: number,
    content: string | null,
    propertyId: number
}