export interface PromptDTO {
  id: number;
  name: string;
  value: string;
};

export class ContextMenuItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly type: chrome.contextMenus.ItemType,
    public readonly contexts: [chrome.contextMenus.ContextType, ...chrome.contextMenus.ContextType[]],
  ) {};
};

export interface OpenModalRequest extends ApiRequest {
  endpoint: Endpoint.OPENMODAL;
  payload: {
    promptId: number;
    selectionText: string;
  };
};

export interface CompleteRequest extends ApiRequest {
  endpoint: Endpoint.COMPLETE;
  payload: {
    promptId: number;
    selectionText: string;
    tabId: number;
  };
};
export function isCompleteRequest(request: ApiRequest): request is CompleteRequest {
  return typeof (request as CompleteRequest).payload?.promptId === "number"
    && (request as CompleteRequest).payload?.selectionText === "string"
    && typeof (request as CompleteRequest).payload?.tabId === "number";
};

export interface ApiRequest {
  endpoint: string;
  payload: unknown;
};

export interface ApiResponse {
  success: boolean;
  data: any;
};

export enum Endpoint {
  OPENMODAL = "openModal",
  COMPLETE = "complete",
};

export enum PortName {
  COMPLETE = "complete",
  toto = "toto",
};
