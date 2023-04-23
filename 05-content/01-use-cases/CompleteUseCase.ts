import { OpenRequest } from "../../01-shared/ApiDTO/ApiRequest";
import { storageFactory } from "../02-ports/output/Storage";
import { Modal } from "./modal/Modal";

export class CompleteUseCase {
  public async handle(reader: ReadableStreamDefaultReader<string>): Promise<void> {
    
    const request: OpenRequest = storageFactory().retrieveRequest();
    const modal = new Modal();

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
