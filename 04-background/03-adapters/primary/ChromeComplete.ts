import { CompleteUseCase } from "../../01-use-cases/Complete";

export class ChromeCompleteAdapter {
  init() {

    chrome.contextMenus.onClicked.addListener(async (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) => {
      // Guard clause:
      // - Tabs might be undefined (eg. click outside a tab)
      // - Tabs might not have ids (eg. tabs without ids)
      if (tab?.id === undefined) return;

      const id: number = (typeof info.menuItemId === "number") ? info.menuItemId: parseInt(info.menuItemId);

      await new CompleteUseCase().handle(id, info.selectionText ?? "", tab.id);

    });

  };

}