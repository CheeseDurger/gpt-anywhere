import { ApiRequest, CompleteFromTabRequest, CompleteRequest, Endpoint, OpenRequest, SaveDataRequest } from "../ApiDTO/ApiRequest";
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

  test('OpenRequest', () => {
    request = new OpenRequest("toto", "");
    expect(OpenRequest.isOpenRequest(request)).toBe(true);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: {promptText: "toto", selectionText: "", ok: "ok"}, ok: "ok"};
    expect(OpenRequest.isOpenRequest(request)).toBe(true);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: {promptText: "toto", selectionText: 1}};
    expect(OpenRequest.isOpenRequest(request)).toBe(false);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: {promptText: 1, selectionText: ""}};
    expect(OpenRequest.isOpenRequest(request)).toBe(false);
    request = { endpoint: Endpoint.SAVE_DATA, payload: {promptText: "toto", selectionText: ""}};
    expect(OpenRequest.isOpenRequest(request)).toBe(false);
  });

  test('CompleteFromTabRequest', () => {
    request = new CompleteFromTabRequest("toto", "");
    expect(CompleteFromTabRequest.isCompleteFromTabRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptText: "toto", selectionText: "", tabId: 0}, ok: "ok"};
    expect(CompleteFromTabRequest.isCompleteFromTabRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptText: "toto", selectionText: 1}};
    expect(CompleteFromTabRequest.isCompleteFromTabRequest(request)).toBe(false);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptText: 1, selectionText: ""}};
    expect(CompleteFromTabRequest.isCompleteFromTabRequest(request)).toBe(false);
    request = { endpoint: Endpoint.SAVE_DATA, payload: {promptText: "toto", selectionText: ""}};
    expect(CompleteFromTabRequest.isCompleteFromTabRequest(request)).toBe(false);
  });

  test('CompleteRequest', () => {
    request = new CompleteRequest("toto", "", 0);
    expect(CompleteRequest.isCompleteRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptText: "toto", selectionText: "", tabId: 0, ok: "ok"}, ok: "ok"};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(true);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptText: "toto", selectionText: 1, tabId: 0}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptText: 1, selectionText: "", tabId: 0}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
    request = { endpoint: Endpoint.COMPLETE, payload: {promptText: "toto", selectionText: "", tabId: "ok"}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
    request = { endpoint: Endpoint.SAVE_DATA, payload: {promptText: "toto", selectionText: "", tabId: 0}};
    expect(CompleteRequest.isCompleteRequest(request)).toBe(false);
  });

  test('SaveDataRequest', () => {
    request = new SaveDataRequest(new DataDTO("", []))
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(true);
    request = { endpoint: Endpoint.SAVE_DATA, payload: new DataDTO("", []), ok: "ok"};
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(true);
    request = { endpoint: Endpoint.SAVE_DATA, payload: {data: 1}};
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(false);
    request = { endpoint: Endpoint.OPEN_MODAL, payload: new DataDTO("", [])};
    expect(SaveDataRequest.isSaveDataRequest(request)).toBe(false);
  });

});
