export declare class Adnalytics {
    constructor(options: AdnalyticsOptions, callback: Function);
    private static setSettings(options);
    static scan(): void;
    static attachListeners(node: HTMLElement): void;
}
export interface AdnalyticsOptions {
    prefix: string;
    callback?: Function;
}
