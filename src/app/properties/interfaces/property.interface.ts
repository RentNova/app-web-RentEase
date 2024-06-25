export interface PropertyResponse {
    id: number ,
    owner : number,
    state : string,
    name: string,
    rating: number,
    type: string,
    rooms: number,
    bathrooms: number,
    size: number,
    ubication: string,
    description: string,
    reviews: Array<number>,
    occupiedBy: object,
    img: string | null
}