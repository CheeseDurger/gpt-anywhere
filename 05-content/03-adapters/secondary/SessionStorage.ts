import { OpenRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { Storage } from "../../02-ports/output/Storage";

export class SessionStorage implements Storage {
  
  public storeRequest(request: OpenRequest): void {
    sessionStorage.promptText = request.payload.promptText;
    sessionStorage.selectionText = request.payload.selectionText;
  };

  public retrieveRequest(): OpenRequest {
    const promptText: string = sessionStorage.promptText + "";
    const selectionText: string = sessionStorage.selectionText + "";
    return new OpenRequest(
      promptText,
      selectionText,
    );
  };

}