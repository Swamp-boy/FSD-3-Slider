// calc distance from left to value in px
export function getPathFromValue(value: number, sliderField: HTMLElement, toddler: HTMLElement,
    orientation: string, min: number, max: number, step: number): number {
    const fieldWidth = (orientation === 'horizontal') ?
        sliderField.offsetWidth :
        sliderField.offsetHeight;
    
    const intervalsNum = (max - min) / step;
    const percent = value / (max - min);
    // distance from left to toddler
    const path = percent * fieldWidth;
    // step in px
    const visualStep = fieldWidth / intervalsNum;
    return path <= 0 ?  path : Math.floor(path / visualStep) * visualStep;
}

export function getValueFromPath(path: number, sliderField: HTMLElement,
    toddler: HTMLElement, orientation: string, min: number, max: number): number {
    const fieldWidth = (orientation === 'horizontal') ?
        sliderField.offsetWidth :
        sliderField.offsetHeight;
    // have add toddlerWidth / 2 to right value
    const percent = (path + toddler.offsetWidth / 2) / (fieldWidth);
    let value = Math.round((max - min) * percent);

    if (path >= fieldWidth)
        value = max
    
    return value
}

export function getValueFromPathMultiVersion(path: number[], sliderField: HTMLElement,
    toddler:HTMLElement, orientation: string, min: number, max: number): number[] {
    const fieldWidth = (orientation === 'horizontal') ?
        sliderField.offsetWidth :
        sliderField.offsetHeight;
    // have add toddlerWidth / 2 to right value
    const percent1 = (path[0] + toddler.offsetWidth) / fieldWidth;
    const percent2 = (path[1] + toddler.offsetWidth) / fieldWidth;

    const value1 = Math.floor((max - min) * percent1);
    const value2 = Math.floor((max - min) * percent2);

    return [value1, value2];
}

export function getIntervalsNum(min: number, max: number, step: number): number {
    return Math.floor(max - min) / step
}

export function getPathFromMousePos(e: MouseEvent, sliderField: HTMLElement,
    toddler: HTMLElement, orientation: string, min: number, max: number, step: number): number {
    const fieldWidth = (orientation === 'horizontal') ?
        sliderField.offsetWidth : sliderField.offsetHeight;
        
    const startPoint = orientation === 'horizontal' ?
        sliderField.getBoundingClientRect().left : sliderField.getBoundingClientRect().bottom;
    
    
    let mousePos: number;
    if (orientation === 'horizontal') {
        if (e.clientX > sliderField.getBoundingClientRect().right)
            mousePos = sliderField.getBoundingClientRect().right - startPoint;
        else
            mousePos = e.clientX - startPoint;
    } else {
        if (e.clientY > sliderField.getBoundingClientRect().bottom)
            mousePos = sliderField.getBoundingClientRect().bottom - startPoint;
        else
            mousePos = startPoint - e.clientY;
    }
    
    const stepInPx = fieldWidth / ((max - min) / step);

    let path = Math.floor(mousePos / stepInPx) * stepInPx;
    
    
    if (path <= 0)
        path = 0;
    
    if (path >= fieldWidth)
        path = fieldWidth;
    
    return path
}

export function getPathFromMousePosMulti(e: MouseEvent, sliderField: HTMLElement,
    toddler: HTMLElement, orientation: string, min: number, max: number, step: number): number {
    const fieldWidth = (orientation === 'horizontal') ?
        sliderField.offsetWidth : sliderField.offsetHeight;
        
    const startPoint = orientation === 'horizontal' ?
        sliderField.getBoundingClientRect().left : sliderField.getBoundingClientRect().bottom;
    
    let mousePos: number;
    if (orientation === 'horizontal') {
        if (e.clientX > sliderField.getBoundingClientRect().right)
            mousePos = sliderField.getBoundingClientRect().right - startPoint;
        else
            mousePos = e.clientX - startPoint;
    } else {
        if (e.clientY > sliderField.getBoundingClientRect().bottom)
            mousePos = sliderField.getBoundingClientRect().bottom - startPoint;
        else
            mousePos = startPoint - e.clientY;
    }
    const stepInPx = fieldWidth / ((max - min) / step);
    
    let path = Math.floor(mousePos / stepInPx) * stepInPx;

    if (path <= 0)
        path = 0;
    
    if (path >= fieldWidth)
        path = fieldWidth;
    
    return path
}