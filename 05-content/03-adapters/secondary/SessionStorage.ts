import { OpenRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { Storage } from "../../02-ports/output/Storage";

export class SessionStorage implements Storage {
  
  public storeRequest(request: OpenRequest): void {
    sessionStorage.promptId = request.payload.promptId;
    sessionStorage.selectionText = request.payload.selectionText;
  };

  public retrieveRequest(): OpenRequest {
    const promptId = sessionStorage.promptId + "";
    const selectionText = sessionStorage.selectionText + "";
    return new OpenRequest(
      parseInt(promptId),
      selectionText,
    );
  };

}