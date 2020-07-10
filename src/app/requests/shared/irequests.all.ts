import { IRequest } from './irequest.request';

export interface IAllRequests {
    all: IRequest[];
    pending: IRequest[];
    paid: IRequest[];
    finished: IRequest[];
}