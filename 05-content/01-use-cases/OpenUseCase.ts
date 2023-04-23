import { OpenRequest } from "../../01-shared/ApiDTO/ApiRequest";
import { storageFactory } from "../02-ports/output/Storage";
import { Modal } from "./modal/Modal";

export class OpenUseCase {
  handle(request: OpenRequest) {
    storageFactory().storeRequest(request);
    new Modal().open();
  };
};
