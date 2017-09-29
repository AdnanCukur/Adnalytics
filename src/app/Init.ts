import { Settings } from "./Settings"

export class Init {
  constructor(options: AdnalyticsOptions) {
    console.log(options)
    Init.setSettings(options)
    Init.scan()
  }
  private static setSettings(options: AdnalyticsOptions) {
    Settings.profile = options.profile
    Settings.onEventAttrName = options.profile + "-on"
    Settings.callback = options.callback
  }

  public static scan(): void {
    let allAdnalyticsElements: HTMLCollectionOf<
      Element
    > = document.getElementsByClassName(Settings.profile)
    console.log("found adnalyticsElements:" + allAdnalyticsElements.length)
    for (let i = 0; i < allAdnalyticsElements.length; i++) {
      let node: HTMLElement = <HTMLElement>allAdnalyticsElements.item(i)
      Init.attachListeners(node)
    }
  }
  public static attachListeners(node: HTMLElement) {
    let attributes = node.attributes
    let onEvent = attributes.getNamedItem(Settings.onEventAttrName)
    console.log(Settings.onEventAttrName)
    console.log(onEvent)
    console.log(attributes)
    node.addEventListener(onEvent.value, (e: Event) => {
      let analyticsObject: any = {}
      for (let i = 0; i < attributes.length; i++) {
        let attributeName = attributes[i].name
        let attributeValue = attributes[i].value
        if (
          attributeName.indexOf(Settings.profile) === 0 &&
          attributeName !== Settings.onEventAttrName
        ) {
          analyticsObject[
            attributeName.replace(Settings.profile + "-", "")
          ] = attributeValue
        }
      }
      Settings.callback(analyticsObject)
    })
  }
}
export interface AdnalyticsOptions {
  profile: string
  callback: Function
}
