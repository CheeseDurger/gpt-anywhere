import { SetContextMenusUseCase } from "../../01-use-cases/SetContextMenus";

export class ChromeContextMenusAdapter {

  /**
   * Register Chrome Context Menus
   */
  public init(): void {
    this.onBrowserEvents(new SetContextMenusUseCase().handle);
  };

  private onBrowserEvents(callback: () => Promise<void>): void {
    chrome.runtime.onInstalled.addListener(callback);
    chrome.storage.sync.onChanged.addListener(callback);
  };

};
