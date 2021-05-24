import ScaleSettings from './ScaleSettings';

interface DefaultSettings {
    sliderType: string;
    min: number;
    max: number;
    step: number;
    value: number;
    multiValue: number[],
    scaleSettings: ScaleSettings,
    valueScale: boolean,
    marksNum: number,
    valueBanner: boolean,
    stepCircles: boolean,
    multiple: boolean,
    minMaxFields: boolean,
    progressBar: boolean,
    
    orientation: string,
}

export default DefaultSettings;