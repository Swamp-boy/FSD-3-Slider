import ScaleSettings from './ScaleSettings';

interface Options {
    sliderType: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    multiValue?: number[],
    marksNum: number,
    valueBanner?: boolean,
    stepCircles?: boolean,
    multiple?: boolean,
    minMaxFields?: boolean,
    progressBar?: boolean,

    orientation?: string,

    scaleSettings?: ScaleSettings,
    valueScale?: boolean,
}

export default Options;