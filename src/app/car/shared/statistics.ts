import { ICarWithHighestGrade } from './carwithhighestgrade';
import { ICarWithMostComments } from './carwithmostcomments';
import { ICarWithMostKilometers } from './carwithmostkilometers';

export interface IStatistics {
    carWithHighestGrade: ICarWithHighestGrade,
    carWithMostComments: ICarWithMostComments,
    carWithMostKilometers: ICarWithMostKilometers
}