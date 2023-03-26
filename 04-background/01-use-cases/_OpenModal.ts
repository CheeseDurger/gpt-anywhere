import { OpenModalRequest } from "../../01-shared/ApiDTO/ApiRequest";

export class OpenModal {

  public handle(request: OpenModalRequest) {
    return {
      success: true,
      data: request,
    };
  };

};
