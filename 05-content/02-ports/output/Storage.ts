import { OpenRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { SessionStorage } from "../../03-adapters/secondary/SessionStorage";

export interface Storage {
  storeRequest(request: OpenRequest): void;
  retrieveRequest(): OpenRequest;
};

export function storageFactory(): Storage {
  return new SessionStorage();
}