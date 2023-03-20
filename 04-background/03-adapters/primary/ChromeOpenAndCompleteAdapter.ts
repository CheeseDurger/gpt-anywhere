import { OpenAndCompleteUseCase } from "../../01-use-cases/OpenAndComplete";
import { CompleteRequest, Endpoint } from "../../../01-shared/types";

export class ChromeOpenAndCompleteAdapter {

  /**
   * Register a handler on Chrome Context Menu click
   * The handler streams a completion to the tab where the Context Menu was clicked
   */
  public init(): void {

    chrome.contextMenus.onClicked.addListener(this.complete);

  };

  private async complete(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) {
    // Guard clause:
    // - Tabs might be undefined (eg. click outside a tab)
    // - Tabs might not have ids (eg. tabs without ids)
    if (tab?.id === undefined) return;


    const request: CompleteRequest = {
      endpoint: Endpoint.COMPLETE,
      payload: {
        promptId: parseInt(info.menuItemId.toString()),
        selectionText: info.selectionText ?? "",
        tabId: tab.id,
      },
    };
    await new OpenAndCompleteUseCase().handle(request);

  }

};
