/**
 * Makes sure we don't get duplicate event listeners on the same dom element
 */
export declare class AdnalyticsStore {
    static store: any;
    private static count;
    static add(element: any): void;
    static exists(element: any): boolean;
}
