import { config } from "../../01-shared/config";

// The observed normal response time from OpenAI is about 200-500 milliseconds, but it can vary greatly
const timeoutMilliseconds: number = 1500;

export class Publisher {

  /**
   * Post messages on web page. An error message will be posted
   * if OpenAI is too slow to send messages.
   * @param reader 
   * @param port 
   */
  public async publish(reader: ReadableStreamDefaultReader<string>, port: chrome.runtime.Port): Promise<void> {

    // Publish message from GPT to web page
    while (true) {
      let timeout = new Promise((resolve, reject) => setTimeout(resolve, timeoutMilliseconds, ""));
      let result: ReadableStreamReadResult<string> | unknown = await Promise.race([reader.read(), timeout]);
      // let result: ReadableStreamReadResult<string> = await reader.read();
      
      // If timeout, then post timeout message and stop
      if (typeof result === "string") {
        port.postMessage(config.error.messages.default);
        console.error("ERROR: timeout from OpenAI response stream\n");
        break;
      }
      
      // If stream is closed, then stop
      if ((result as ReadableStreamReadResult<string>).done) break;

      // Else post stream message
      port.postMessage((result as ReadableStreamReadResult<string>).value);
    }
  };

}
