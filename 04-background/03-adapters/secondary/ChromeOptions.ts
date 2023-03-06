import { OptionsPort } from "../../02-ports/output/Options";

export class ChromeOptionsAdapter implements OptionsPort {

  public async open(): Promise<void> {
    await chrome.runtime.openOptionsPage();
  };

};
