import { CompleteFromTabRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { BackgroundPort } from "../../02-ports/output/BackgroundPort";

export class ChromeBackgroundAdapter implements BackgroundPort {

  public complete(request: CompleteFromTabRequest): void {
    chrome.runtime.sendMessage(request);
  };

};
