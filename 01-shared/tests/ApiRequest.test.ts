import { ApiRequest, CompleteRequest, Endpoint, OpenModalRequest, SaveDataRequest } from "../ApiDTO/ApiRequest";
import { DataDTO } from "../StorageDTO";

describe('ApiRequest', () => {

  let request: any;
  
  test('ApiRequest', () => {
    request = new ApiRequest(Endpoint.COMPLETE, {});
    expect(ApiRequest.isApiRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: {}, ok: "ok"};
    expect(ApiRequest.isApiRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: 1};
    expect(ApiRequest.isApiRequest(request)).toBe(true);
    request = { endpoint: 1, payload: {}};
    expect(ApiRequest.isApiRequest(request)).toBe(false);
  });

  test('OpenModalRequest', () => {
    request = new OpenModalRequest(0, "");
    expect(OpenModalRequest.isOpenModalRequest(request)).toBe(true);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: {promptId: 0, selectionText: "", ok: "ok"}, ok: "ok"};
    expect(OpenModalRequest.isOpenModalRequest(request)).toBe(true);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: {promptId: 0, selectionText: 1}};
    expect(OpenModalRequest.isOpenModalRequest(request)).toBe(false);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: {promptId: "ok", selectionText: ""}};
    expect(OpenModalRequest.isOpenModalRequest(request)).toBe(false);
    request = { endpoint: Endpoint.SAVE_DATA, payload: {promptId: 0, selectionText: ""}};
    expect(OpenModalRequest.isOpenModalRequest(request)).toBe(false);
  });

  test('CompleteRequest', () => {
    request = new CompleteRequest(0, "", 0);
    expect(CompleteRequest.isCompleteRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptId: 0, selectionText: "", tabId: 0, ok: "ok"}, ok: "ok"};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptId: 0, selectionText: 1, tabId: 0}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptId: "ok", selectionText: "", tabId: 0}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptId: 0, selectionText: "", tabId: "ok"}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
    request = { endpoint: Endpoint.SAVE_DATA, payload: {promptId: 0, selectionText: "", tabId: 0}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
  });

  it('should be a valid SaveDataRequest', () => {
    request = { endpoint: Endpoint.SAVE_DATA, payload: new DataDTO("", [])};
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(true);
    request = { endpoint: Endpoint.SAVE_DATA, payload: new DataDTO("", []), ok: "ok"};
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(true);
    request = { endpoint: Endpoint.SAVE_DATA, payload: {data: 1}};
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(false);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: new DataDTO("", [])};
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(false);
  });

});
