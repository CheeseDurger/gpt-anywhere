import { OpenOptionsUseCase } from "../../01-use-cases/OpenOptions";

export class ChromeOptionsAdapter {
  public init(): void {
    this.onBrowserEvents(new OpenOptionsUseCase().handle);
  };

  private onBrowserEvents = (callback: () => void): void => {
    chrome.runtime.onInstalled.addListener(async (details) => {
      if (details.reason === "install") callback();
    });

    chrome.action.onClicked.addListener(callback);
  };

};
