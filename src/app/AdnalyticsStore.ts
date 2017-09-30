/**
 * Makes sure we don't get duplicate event listeners on the same dom element
 */
export class AdnalyticsStore {
  public static store: any = {}
  private static count: number = 0
  public static add(element: any): void {
    element.__data = AdnalyticsStore.count++
    AdnalyticsStore.store[element.__data] = 1
  }
  public static exists(element: any): boolean {
    if (AdnalyticsStore.store[element.__data] != null) {
      return true
    }
    return false
  }
}
