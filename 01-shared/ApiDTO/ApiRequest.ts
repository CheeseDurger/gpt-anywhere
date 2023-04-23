import { DataDTO } from "../StorageDTO";

export class OpenRequest implements ApiRequest {
  public endpoint = Endpoint.OPEN_MODAL;
  public payload: {promptText: string; selectionText: string; };

  constructor(promptText: string, selectionText: string) {
    this.payload = {promptText, selectionText};
  };

  static isOpenRequest(request: unknown): request is OpenRequest {
    return ApiRequest.isApiRequest(request)
      && request.endpoint === Endpoint.OPEN_MODAL
      && typeof request.payload === "object"
      && request.payload !== null
      && "promptText" in request.payload && typeof request.payload.promptText === "string"
      && "selectionText" in request.payload && typeof request.payload.selectionText === "string";
  };
};

export class CompleteFromTabRequest implements ApiRequest {
  public endpoint = Endpoint.COMPLETE;
  public payload: {promptText: string; selectionText: string;};

  constructor(promptText: string, selectionText: string) {
    this.payload = {promptText, selectionText};
  };

  static isCompleteFromTabRequest(request: unknown): request is CompleteFromTabRequest {
    return ApiRequest.isApiRequest(request)
      && request.endpoint === Endpoint.COMPLETE
      && typeof request.payload === "object"
      && request.payload !== null
      && "promptText" in request.payload && typeof request.payload.promptText === "string"
      && "selectionText" in request.payload && typeof request.payload.selectionText === "string";
  };
};

export class CompleteRequest extends CompleteFromTabRequest implements ApiRequest {
  public payload: {promptText: string; selectionText: string; tabId: number;};

  constructor(promptText: string, selectionText: string, tabId: number) {
    super(promptText, selectionText);
    this.payload = {promptText, selectionText, tabId};
  };

  static isCompleteRequest(request: unknown): request is CompleteRequest {
    return ApiRequest.isApiRequest(request)
      && request.endpoint === Endpoint.COMPLETE
      && typeof request.payload === "object"
      && request.payload !== null
      && "promptText" in request.payload && typeof request.payload.promptText === "string"
      && "selectionText" in request.payload && typeof request.payload.selectionText === "string"
      && "tabId" in request.payload && typeof request.payload.tabId === "number";
  };
};

export class SaveDataRequest implements ApiRequest {
  public endpoint = Endpoint.SAVE_DATA;

  constructor(public payload : DataDTO) {};

  static isSaveDataRequest(request: unknown): request is SaveDataRequest {
    return ApiRequest.isApiRequest(request)
      && request.endpoint === Endpoint.SAVE_DATA
      && DataDTO.isDataDTO(request.payload);
  };
};

export class ApiRequest {
  constructor(
    public endpoint: Endpoint,
    public payload: unknown,
  ) {};

  static isApiRequest(request: unknown): request is ApiRequest {
    return typeof request === 'object'
      && request !== null
      && "endpoint" in request && typeof request.endpoint === "string"
      && Object.values(Endpoint).includes(request.endpoint as Endpoint)
      && "payload" in request;
  };
};

export enum Endpoint {
  OPEN_MODAL = "openModal",
  COMPLETE = "complete",
  GET_DATA = "getData",
  SAVE_DATA = "saveData",
};
