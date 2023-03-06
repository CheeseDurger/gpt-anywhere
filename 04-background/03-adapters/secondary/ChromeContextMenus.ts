import { ContextMenusPort } from "../../02-ports/output/ContextMenus";
import { DataDTO, PromptEntryDTO } from "../../02-ports/output/DTO";
import { storageFactory } from "../../02-ports/output/Storage";

export class ChromeContextMenusAdapter implements ContextMenusPort {
  /**
 * Update 1 context menu for each prompt
 * @param prompts 
 */
  public update(prompts: PromptEntryDTO[]): void {

    chrome.contextMenus.removeAll();

    prompts.forEach((prompt: PromptEntryDTO, index: number) => {
      chrome.contextMenus.create({
        id: index.toString(),
        title: this.title(prompt.name),
        type: 'normal',
        contexts: ['all'],
      });
    });

  };

  public onClick(callback: (savedPrompt: string, selectedText: string, tab: chrome.tabs.Tab) => Promise<void>): void {

    chrome.contextMenus.onClicked.addListener(async (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) => {
      // Guard clause:
      // - Tabs might be undefined (eg. click outside a tab)
      // - Tabs might not have ids (eg. tabs without ids)
      if (tab?.id === undefined) return;

      const id: number = (typeof info.menuItemId === "number") ? info.menuItemId: parseInt(info.menuItemId);

      const data: DataDTO = await storageFactory().data();

      return await callback(data.prompts[id].value, info.selectionText ?? "", tab);

    });
  };

  private title(promptName: string): string {
    return "Generate: " + promptName;
  };

};
