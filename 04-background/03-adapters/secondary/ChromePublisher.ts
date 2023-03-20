import { config } from "../../../01-shared/config";
import { OpenModalRequest, PortName } from "../../../01-shared/types";
import { PublisherPort } from "../../02-ports/output/Publisher";

export class ChromePublisherAdapter implements PublisherPort {

  /**
   * Post messages on web page. An error message will be posted
   * if OpenAI is too slow to send messages.
   * @param reader 
   * @param port 
   */
  public async publish(tabId: number, reader: ReadableStreamDefaultReader<string>): Promise<void> {

    const port: chrome.runtime.Port = chrome.tabs.connect(tabId, { name: PortName.COMPLETE });

    // Publish message from GPT to web page
    while (true) {
      const timeout = new Promise<string>((resolve, reject) => setTimeout(resolve, config.openai.timeout, ""));
      const result: ReadableStreamReadResult<string> | string = await Promise.race([reader.read(), timeout]);

      // If timeout, then post timeout message and stop
      if (typeof result === "string") {
        console.error("ERROR: timeout from OpenAI servers\n");
        port.postMessage("ERROR: timeout from OpenAI servers\n");
        break;
      }
      
      // If stream is closed, then stop
      if (result.done) break;

      // Else post stream message
      port.postMessage(result.value);
    }

    port.disconnect();
    
  };

  public async openModal(tabId: number, request: OpenModalRequest): Promise<void> {
    await chrome.tabs.sendMessage(tabId, request);
  };
};
