import { OpenRequest } from "../../01-shared/ApiDTO/ApiRequest";
import { Modal } from "./modal/Modal";

export class OpenUseCase {
  handle(request: OpenRequest) {
    const modal = new Modal().open();
  };
}