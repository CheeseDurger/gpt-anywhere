import { PromptDTO } from "../../01-shared/types";

export class ContextMenus {

  /**
   * Set 1 context menu for each prompt
   * @param prompts 
   */
  async set(prompts: PromptDTO[]) {

    chrome.contextMenus.removeAll();
    prompts.forEach((prompt: PromptDTO, index: number) => {
      chrome.contextMenus.create({
        id: index.toString(),
        title: "Generate: " + prompt.name,
        type: 'normal',
        contexts: ['editable'],
      });
    });

  };

}