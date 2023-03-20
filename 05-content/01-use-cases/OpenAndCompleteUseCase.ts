import { backgroundFactory } from "../02-ports/output/BackgroundPort";
import { Modal } from "./modal/Modal";

export class OpenAndCompleteUseCase {
  handle(): void {
    const modal = new Modal().open();
    const writer: WritableStreamDefaultWriter<string> = this.getWriter(modal);
    backgroundFactory(writer).complete();
  };

  private getWriter(modal: Modal): WritableStreamDefaultWriter<string> {
    return new WritableStream({
      write(chunk: string) {
        modal.addText(chunk);
      },
      close() {
        modal.stopText();
      },
      abort() {
        modal.stopText();
      },
    }).getWriter();
  };

};
