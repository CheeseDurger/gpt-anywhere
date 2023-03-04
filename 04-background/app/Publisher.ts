// The observed normal response time from OpenAI is about 200-500 milliseconds, but it can vary greatly
const timeoutMs: number = 1500;

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
      const timeout = new Promise((resolve, reject) => setTimeout(resolve, timeoutMs, ""));
      const result: ReadableStreamReadResult<string> | unknown = await Promise.race([reader.read(), timeout]);
      
      // If timeout, then post timeout message and stop
      if (typeof result === "string") {
        console.error("ERROR: timeout from OpenAI servers\n");
        port.postMessage("ERROR: timeout from OpenAI servers\n");
        break;
      }
      
      // If stream is closed, then stop
      if ((result as ReadableStreamReadResult<string>).done) break;

      // Else post stream message
      port.postMessage((result as ReadableStreamReadResult<string>).value);
    }
  };

};
