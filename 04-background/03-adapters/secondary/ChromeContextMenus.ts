import { PromptDTO } from "../../../01-shared/StorageDTO";
import { ContextMenusPort } from "../../02-ports/output/ContextMenus";

export class ChromeContextMenusAdapter implements ContextMenusPort {
  /**
   * Update 1 context menu for each prompt
   * @param prompts 
   */
  public update(prompts: PromptDTO[]): void {

    chrome.contextMenus.removeAll();

    prompts.forEach((prompt: PromptDTO, index: number) => {
      chrome.contextMenus.create({
        id: index.toString(),
        title: this.title(prompt.name),
        type: 'normal',
        contexts: ['all'],
      });
    });

  };

  private title(promptName: string): string {
    return "Generate: " + promptName;
  };

};
