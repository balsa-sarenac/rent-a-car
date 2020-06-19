export interface IRequest {
    id: number,
    pickUpPlace: string,
    pickUpDate: Date,
    returnDate: Date,
    status: string,
    adId: number,
    bundleId: number
}
