import { PromptDTO } from "../../01-shared/types";

export class Fetcher {

  private readonly apiKey: string;
  private readonly endpoint: string;
  private readonly model: string;

  constructor(apiKey: string, endpoint: string, model: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
    this.model = model;
  }

  /**
   * Opens a completion stream from GPT and returns a reader for it
   * @param prompt 
   * @returns reader for GPT completion stream
   */
  public async getCompletion(prompt: PromptDTO): Promise<ReadableStreamDefaultReader<string>> {

    const response = await fetch(this.endpoint, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + this.apiKey,
      },
      body: JSON.stringify({
        model: this.model,
        prompt: prompt.value,
        max_tokens: 4000,
        stop: "\n\nµµµ",
        stream: true,
      }),
    },
    );

    if (response.body === null) throw new Error("Fetch body is null");
    
    const reader: ReadableStreamDefaultReader<string> = response.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(this.openAiJSON())
      .pipeThrough(this.openAiText())
      .getReader();

      return reader;

  };

  /**
   * Transform a stream from string to JSON
   * @returns `TransformStream` to be used as argument of `ReadableStream.pipeThrough()`
   */
  private openAiJSON(): TransformStream {
    return new TransformStream({
      /**
       * @description transform 1 SSE string event into multiple JSON events
       */
      transform(chunkString, controller) {

        let messages: string[] = chunkString
          .replace(/\n\n$/g, "")      // Remove last 2 ending newlines
          .split("\n\n");             // Split every 2 newlines (each message is separated by 2 newlines)

        for (const message of messages) {
          // Guard clause : close stream if last stream message
          if (message === "data: [DONE]") {
            controller.terminate();
            break;
          }

          // Guard clause : don't process SSE comments
          if (message.charAt(0) === ":") continue;
          
          // Guard clause : don't process empty stream message
          if (message === "data: ") continue;
          
          // Remove start of message
          let jsonString: string = message.replace(/^data: /g, "");

          try {
            controller.enqueue(JSON.parse(jsonString));
          } catch (error) {
            continue;
          }
        };

      },
    });
  };

  /**
   * Extract OpenAI completion from JSON stream
   * @returns `TransformStream` to be used as argument of `ReadableStream.pipeThrough()`
   */
  private openAiText(): TransformStream {
    return new TransformStream({
      transform(chunkJSON, controller) {

        // Guard clause : return "Error" if error from OpenAI
        if(chunkJSON.error !== undefined) {
          controller.enqueue("Error : server error from OpenAI");
          controller.terminate();
        }

        // Guard clause : return "Error" if malformed JSON
        let text: any = chunkJSON?.choices?.[0]?.text;
        if (typeof text !== "string") {
          controller.enqueue("Error : malformed JSON received from OpenAI");
          controller.terminate();
        }
        else controller.enqueue(text);

      },
    });
  };

}
