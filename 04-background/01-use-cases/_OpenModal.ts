import { OpenModalRequest } from "../../01-shared/types";

export class OpenModal {

  public handle(request: OpenModalRequest) {
    return {
      success: true,
      data: request,
    };
  };

};

