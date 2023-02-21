export class Selector {

  /**
   * Get active element, even if it's inside multiple nested Iframes
   * @param document current DOM
   * @returns current active element
   */
  getActiveElement(document: Document): HTMLElement | null {

    if (document.activeElement?.tagName === "IFRAME") {

      // Get all iframes
      let iframes: HTMLCollectionOf<HTMLIFrameElement> = document.getElementsByTagName('iframe');

      for (let i = 0; i < iframes.length; i++) {
        // Guard clause
        if (iframes[i].contentDocument === null) continue;

        let focused: HTMLElement | null = this.getActiveElement(iframes[i].contentDocument as Document);

        // If null, search next iframe
        if (focused === null) continue;
        else return focused;

      }

      // If no active element found, return null
      return null;

    }
    else if (document.activeElement === null || document.activeElement.tagName === "BODY") return null;
    else return document.activeElement as HTMLElement;

  };
};
