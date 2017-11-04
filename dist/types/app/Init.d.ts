/** registers the observer which observers changes made to the dom
 *  initiates the initial scan of elements
 */
export declare class Init {
    constructor(options: AdnalyticsOptions);
    static setSettings(options: AdnalyticsOptions): void;
    /**
     * Scans the dom for the profile class and attaches a listener to the elements
     */
    static scan(): void;
    /**
     * Attaches a listener to the element which then calls the callback method when triggered with the belonging profile attributes as an object
     * ex: <p class='myprofile' myprofile-on='click' myprofile-name='peter' myprofile-id='4'>text..</p>
     *     will trigger the callback function when the element is clicked on with an object {name:"peter", id:"4"}
     * @param node element with the profile class
     */
    static attachListeners(node: HTMLElement): void;
}
export declare class AdnalyticsOptions {
    profile: string;
    callback: Function;
}
