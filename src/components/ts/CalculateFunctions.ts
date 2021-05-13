// calc distance from left to value in px
export function getPathFromValue(value: number, sliderField: HTMLElement,
    orientation: string, min: number, max: number, step: number ): number {
    const fieldWidth = (orientation === 'horizontal') ?
    sliderField.offsetWidth :
    sliderField.offsetHeight;
    
    const intervalsNum = (max - min) / step;
    const percent = value / (max - min);
    // distance from left to toddler
    const path = percent * fieldWidth;
    // step in px
    const visualStep = fieldWidth / intervalsNum;
    return Math.floor(path / visualStep) * visualStep;
}

export function getValueFromPath(path: number, sliderField: HTMLElement,
   toddler:HTMLElement, orientation: string, min: number, max: number): number {
    const fieldWidth = (orientation === 'horizontal') ?
        sliderField.offsetWidth :
        sliderField.offsetHeight;
    // have add toddlerWidth / 2 to right value
    const percent = (path + toddler.offsetWidth / 2) / fieldWidth;
    const value = Math.round((max - min) * percent);
    return value
}

export function getValueFromPathMultiVersion(path: number[], sliderField: HTMLElement,
    toddler:HTMLElement, orientation: string, min: number, max: number): number[] {
    const fieldWidth = (orientation === 'horizontal') ?
        sliderField.offsetWidth :
        sliderField.offsetHeight;
    // have add toddlerWidth / 2 to right value
    const percent1 = (path[0] + toddler.offsetWidth / 2) / fieldWidth;
    const percent2 = (path[1] + toddler.offsetWidth / 2) / fieldWidth;

    const value1 = (max - min) * percent1;
    const value2 = (max - min) * percent2;

    return [value1, value2];
}

export function getIntervalsNum(min: number, max: number, step: number): number {
    return Math.floor(max - min) / step
}