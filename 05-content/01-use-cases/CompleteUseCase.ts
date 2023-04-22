import { Modal } from "./modal/Modal";

export class CompleteUseCase {
  public async handle(reader: ReadableStreamDefaultReader<string>): Promise<void> {
    const modal = new Modal().open();

    while (true) {
      const result: ReadableStreamReadResult<string> = await reader.read();
      
      // If stream is closed, then stop
      if (result.done) break;

      // Else post stream message
      else modal.addText(result.value);
    }

    modal.stopText();

  };

};
