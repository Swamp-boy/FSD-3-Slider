interface Options {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    multiValue?: number[];

    font?: {
        size?: number,
        family?: string,
        weight? :number | string,
        color? : string,
    },

    valueScale?: boolean,
    valueBanner?: boolean,
    stepCircles?: boolean,
    multiple?: boolean,
    minMaxFields?: boolean,
    progressBar?: boolean,
    
    position?: string, 
}

export default Options;