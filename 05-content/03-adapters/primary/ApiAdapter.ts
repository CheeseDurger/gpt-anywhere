import { OpenAndCompleteUseCase } from "../../01-use-cases/OpenAndCompleteUseCase";
import { ApiRequest, Endpoint } from "../../../01-shared/ApiDTO/ApiRequest";

export class ApiAdapter {
  /**
   * Register message handlers for the extension's API.
   */
  public init(): void {
    /**
     * The callback of `.onMessage` should return `true` to keep 
     * the internal messaging channel open so that sendResponse()
     * can work asynchronously.
     */
    chrome.runtime.onMessage.addListener(this.route);

  };

  private route(request: ApiRequest, sender: chrome.runtime.MessageSender): boolean {

    // Guard clause: message received from extension
    if (sender?.id !== chrome.runtime.id) return false;

    switch (request.endpoint) {

      case Endpoint.OPEN_MODAL:
        new OpenAndCompleteUseCase().handle();
        return false;
        break;

      default:
        return false; // sendResponse() won't be called so we can close the messaging chanel
        break;

    }

  };

};
