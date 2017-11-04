import { Init } from "../Adnalytics";
import { Settings } from "./Settings";

/**
 * Observes DOM changes to be able to catch if a new element gets added to the dom that should attach event listeners.
 * SPA's and lazy loaded content won't work without this.
 * Doesnt work for IE <= 10
 */
export class AdnalyticsObserver {
  public static register() {
    // check if browser supports mutation observer, if not return.
    if (!("MutationObserver" in window)) {
      return;
    }

    let observer: MutationObserver = new MutationObserver(mutations => {
      mutations.forEach((mutation: MutationRecord): void => {
        AdnalyticsObserver.handleDomMutation(mutation);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  }
  private static handleDomMutation(mutation: any): void {
    if (!mutation.addedNodes) {
      return;
    }

    for (let i: number = 0; i < mutation.addedNodes.length; i++) {
      let node: HTMLElement = mutation.addedNodes[i] as HTMLElement;
      if (node == null || node.id == null || node.className == null) {
        return;
      }

      AdnalyticsObserver.handleAddedDomElement(node);
    }
  }

  private static handleAddedDomElement(element: HTMLElement): void {
    // check if added dom element is an adnalytics element and if it is attach listeners to it
    if (AdnalyticsObserver.elementIsAdnalyticsElement(element)) {
      Init.attachListeners(element);
    }

    // check if added dom element contains adnalytics elements and if it does
    // attach listeners to every one of those elements
    let adnalyticsElementsInside: NodeListOf<
      Element
    > = AdnalyticsObserver.elementContainsAdnalyticsElements(element);
    if (adnalyticsElementsInside.length > 0) {
      for (let i: number = 0; i < adnalyticsElementsInside.length; i++) {
        let node: HTMLElement = adnalyticsElementsInside.item(i) as HTMLElement;
        Init.attachListeners(node);
      }
    }
  }

  private static elementIsAdnalyticsElement(element: HTMLElement): boolean {
    let classnames: string[] = element.className.split(" ");
    for (let i: number = 0; i < classnames.length; i++) {
      if (classnames[i].indexOf(Settings.profile) === 0) {
        return true;
      }
    }
    return false;
  }
  private static elementContainsAdnalyticsElements(
    element: HTMLElement
  ): NodeListOf<Element> {
    return element.getElementsByClassName(Settings.profile);
  }
}
