/**
 * Observes DOM changes to be able to catch if a new element gets added to the dom that should attach event listeners.
 * SPA's and lazy loaded content won't work without this.
 * Doesnt work for IE <= 10
 */
export declare class AdnalyticsObserver {
    static register(): void;
    private static handleDomMutation(mutation);
    private static handleAddedDomElement(element);
    private static elementIsAdnalyticsElement(element);
    private static elementContainsAdnalyticsElements(element);
}
