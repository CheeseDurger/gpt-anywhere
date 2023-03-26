import { OpenAndCompleteUseCase } from "../../01-use-cases/OpenAndComplete";
import { ApiRequest, CompleteRequest, Endpoint, SaveDataRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { ApiResponse, DataResponse } from "../../../01-shared/ApiDTO/ApiResponse";
import { GetData } from "../../01-use-cases/GetData";
import { SetData } from "../../01-use-cases/SetData";

export class ApiAdapter {

  /**
   * Register message handlers for the extension's API.
   */
  public init() {
    /**
     * The callback of `.onMessage` should return `true` in order to keep 
     * the internal messaging channel open so that sendResponse()
     * can work asynchronously.
     */
    chrome.runtime.onMessage.addListener(this.route);
  };

  private route(
    request: ApiRequest,
    sender: chrome.runtime.MessageSender,
    sendResponse: (ApiResponse: ApiResponse) => void,
  ): boolean {
    switch (request.endpoint) {

      case Endpoint.COMPLETE:

        // Guard clause
        if (!CompleteRequest.isCompleteRequest(request)) {
          console.error("ERROR: payload malformed");
          sendResponse(new ApiResponse(false, {message: "ERROR: payload malformed"}));
          return false;
        };

        // Guard clause
        if (sender.tab?.id === undefined) {
          console.error("ERROR: tab id undefined");
          sendResponse(new ApiResponse(false, {message: "ERROR: tab id undefined"}));
          return false;
        };

        new OpenAndCompleteUseCase().handle(request);
        return false;
        break;
    
      case Endpoint.GET_DATA:
        new GetData().handle().then( (response: DataResponse) => sendResponse(response) );
        return true;
        break;
        
      case Endpoint.SAVE_DATA:

        // Guard clause
        if (!SaveDataRequest.isSaveDataRequest(request)) {
          console.error("ERROR: request malformed");
          return false;
        }

        new SetData().handle(request.payload);
        return false;
        break;
          
      default:
        console.log("STOPPED in switch");
        return false;
        break;
    }
  };

};
