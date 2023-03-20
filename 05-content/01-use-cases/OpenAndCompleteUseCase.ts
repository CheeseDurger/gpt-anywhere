import { backgroundFactory } from "../02-ports/output/BackgroundPort";
import { Modal } from "./modal/Modal";

export class OpenAndCompleteUseCase {
  handle(): void {
    const modal = new Modal().open();
    backgroundFactory().complete();
  };
};
