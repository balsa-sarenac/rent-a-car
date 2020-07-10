import { IRentRequest } from './irequest.rent';
import { IBundle } from './ibundle.rent';

export interface ICart {
    requests: IRentRequest[],
    bundles: IBundle[]
}
