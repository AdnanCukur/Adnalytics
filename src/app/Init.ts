import { AdnalyticsObserver } from "./AdnalyticsObserver";
import { AdnalyticsStore } from "./AdnalyticsStore";
import { Settings } from "./Settings";

/** registers the observer which observers changes made to the dom
 *  initiates the initial scan of elements
 */
export class Init {
  constructor(options: AdnalyticsOptions) {
    Init.setSettings(options);
    AdnalyticsObserver.register();
    Init.scan();
  }
  public static setSettings(options: AdnalyticsOptions) {
    Settings.profile = options.profile;
    Settings.onEventAttrName = options.profile + "-on";
    Settings.callback = options.callback;
  }

  /**
   * Scans the dom for the profile class and attaches a listener to the elements
   */
  public static scan(): void {
    let allAdnalyticsElements: HTMLCollectionOf<
      Element
    > = document.getElementsByClassName(Settings.profile);
    for (let i = 0; i < allAdnalyticsElements.length; i++) {
      let node: HTMLElement = allAdnalyticsElements.item(i) as HTMLElement;
      Init.attachListeners(node);
    }
  }
  /**
   * Attaches a listener to the element which then calls the callback method
   * when triggered with the belonging profile attributes as an object
   * ex: <p class='myprofile' myprofile-on='click' myprofile-name='peter' myprofile-id='4'>text..</p>
   *     will trigger the callback function when the element is clicked on with an object {name:"peter", id:"4"}
   * @param node element with the profile class
   */
  public static attachListeners(node: HTMLElement): void {
    if (AdnalyticsStore.exists(node)) {
      return;
    }
    AdnalyticsStore.add(node);
    let attributes: NamedNodeMap = node.attributes;
    let onEvent: Attr = attributes.getNamedItem(Settings.onEventAttrName);
    let analyticsObject: any = {};
    for (let i: number = 0; i < attributes.length; i++) {
      let attributeName: string = attributes[i].name;
      let attributeValue: string = attributes[i].value;
      if (
        attributeName.indexOf(Settings.profile) === 0 &&
        attributeName !== Settings.onEventAttrName
      ) {
        analyticsObject[
          attributeName.replace(Settings.profile + "-", "")
        ] = attributeValue;
      }
    }
    if (onEvent.value === "load") {
      Settings.callback(analyticsObject);
    } else {
      node.addEventListener(onEvent.value, (e: Event) => {
        Settings.callback(analyticsObject);
      });
    }
  }
}
export class AdnalyticsOptions {
  profile: string;
  callback: Function;
}
