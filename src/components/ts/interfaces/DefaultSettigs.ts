interface DefaultSettings {
    min: number;
    max: number;
    step: number;
    value: number;
    multiValue: number[],
    valueScale: boolean,
    valueBanner: boolean,
    stepCircles: boolean,
    multiple: boolean,
    minMaxFields: boolean,
    progressBar: boolean,
    
    orientation: string, 
}

export default DefaultSettings;