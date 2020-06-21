import { NumberValueAccessor } from '@angular/forms';

export interface ICarWithHighestGrade {
    id: number,
    markId: number,
    modelId: number,
    markName: string,
    modelName: string,
    averageGrade: number
}