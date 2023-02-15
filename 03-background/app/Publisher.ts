export class Publisher {

  /**
   * Post messages on web page
   * @param reader 
   * @param port 
   */
  public async publish(reader: ReadableStreamDefaultReader<string>, port: chrome.runtime.Port): Promise<void> {

    // Publish message from GPT to web page
    while (true) {
      let result: ReadableStreamReadResult<string> = await reader.read();
      console.debug("result :", result);
      if (result.done) break;
      port.postMessage(result.value);
    }
  };

}
