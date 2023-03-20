import { ValidateSchemaUseCase } from "../../01-use-cases/ValidateSchema";

export class ChromeStorageAdapter {

  /**
   * Ensure data schema is up-to-date
   */
  public init(): void {
    this.onBrowserEvents(new ValidateSchemaUseCase().handle);
  };

  private onBrowserEvents = (callback: () => void): void => {
    chrome.runtime.onInstalled.addListener(async (details) => {
      if (details.reason === "install" || details.reason === "update") callback();
    });
  };

};
