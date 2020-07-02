export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    companyName: string,
    isAdmin: boolean,
    enabled: boolean,
    address: string,
    businessID: string,
    email: string,
    roles: string[],
    password: string,
    numCanReq: number,
    flagPaid: boolean
}