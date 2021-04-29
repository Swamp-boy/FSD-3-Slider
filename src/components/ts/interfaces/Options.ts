interface Options {
    sliderType: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    multiValue?: number[],
    valueScale?: boolean,
    marksNum: number,
    valueBanner?: boolean,
    stepCircles?: boolean,
    multiple?: boolean,
    minMaxFields?: boolean,
    progressBar?: boolean,
    
    orientation?: string, 
}

export default Options;