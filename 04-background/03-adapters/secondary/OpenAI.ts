// import { encode, decode } from "gpt-3-encoder";
import { Model } from "../../02-ports/output/DTO";
import { AiPort } from "../../02-ports/output/Ai";
import { config } from "../../../01-shared/config";

export class OpenAIAdapter implements AiPort {

  private readonly apiKey: string;
  private readonly endpoint: string;
  private readonly model: Model;

  constructor(apiKey: string, endpoint: string, model: Model) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
    this.model = model;
  };

  /**
   * Opens a completion stream from GPT and returns a reader for it
   * @param prompt 
   * @returns reader for GPT completion stream
   * 
   * @todo add precise token count with gpt-3-encoder 
   * Currently waiting for gpt-3-encoder to merge PR #33 to have a precise token count
   * In the mean time, we estimate the token count by dividing the number of char 
   * by 4 and adding a 10% margin.
   * @link https://github.com/latitudegames/GPT-3-Encoder/issues/32
   * @link https://github.com/latitudegames/GPT-3-Encoder/pull/33
   */
  public async getCompletion(prompt: string): Promise<ReadableStreamDefaultReader<string>> {

    // const promptTokens: number = encode(promptText).length;
    // const completionTokens = this.model.sharedTokens - encode(promptText).length;
    // Guard clause: check max tokens
    // if (completionTokens <= 0) return this.getErrorStream(`ERROR: prompt is about ${promptTokens} tokens. This is above ${this.model.maxTokens} max tokens for prompt + completion\n`);
    const promptTokens: number = Math.round( 1.1 * prompt.length / 4 );
    const completionTokens: number = this.model.maxTokens - promptTokens - 200;

    // Initialize timeout
    const controller: AbortController = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.openai.timeout);

    let response: Response;
    try {
      response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + this.apiKey,
        },
        body: JSON.stringify({
          model: this.model.name,
          prompt: prompt,
          max_tokens: completionTokens,
          stop: "\n\nµµµ",
          stream: true,
        }),
        signal: controller.signal, // timeout
      });
    } catch (error) {
      console.error("ERROR: timeout from OpenAI servers\n", error);
      return this.getErrorStream("ERROR: timeout from OpenAI servers\n");
    }

    // Clear timeout
    clearTimeout(timeoutId);

    if (response.body === null) {
      console.error("ERROR: response.body is null\n");
      return this.getErrorStream("ERROR: error from OpenAI servers\n");
    }
    
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
  private openAiJSON(): TransformStream<string, IObject> {
    return new TransformStream({
      /**
       * @description transform 1 SSE string event into multiple JSON events
       */
      transform(chunkString: string, controller: TransformStreamDefaultController<IObject>) {

        console.log("OpenAI SSE:\n", chunkString);

        // Guard clause: input is not a string
        if (typeof chunkString !== "string") {
          console.error("ERROR: OpenAI returned a non string\n:", chunkString);
          controller.enqueue(new OpenAIJSONResponse(`ERROR: OpenAI returned "${JSON.stringify(chunkString)}"`));
          controller.terminate();
          return;
        }

        const messages: string[] = chunkString
          .replace(/\n\n$/g, "")      // Remove last 2 ending newlines
          .split("\n\n");             // Split every 2 newlines (each message is separated by 2 newlines)

        for (const message of messages) {
          // Guard clause: close stream if last stream message
          if (message === "data: [DONE]") {
            controller.terminate();
            break;
          }

          // Guard clause: don't process SSE comments
          if (message.charAt(0) === ":") continue;
          
          // Guard clause: don't process empty stream message
          if (message === "data: ") continue;
          
          // Remove start of message
          const jsonString: string = message.replace(/^data: /g, "");
          let result: IObject | Array<any>;

          try {
            result = JSON.parse(jsonString) as IObject | Array<any>; // JSONs are objects or arrays
          } catch (error) {
            // Don't process not valid JSON
            console.error("ERROR: json is not valid:\n", jsonString, "\nContinuing without processing...");
            continue;
          }

          // Guard clause : don't process arrays
          if (Array.isArray(result)) {
            console.error("ERROR: json is an array:\n", result, "\nContinuing without processing...");
            continue;
          }

          controller.enqueue(result);
        };

      },
    });
  };

  /**
   * Extract OpenAI completion from JSON stream
   * @returns `TransformStream` to be used as argument of `ReadableStream.pipeThrough()`
   */
  private openAiText(): TransformStream<IObject, string> {
    return new TransformStream({
      transform(chunkJSON: IObject, controller: TransformStreamDefaultController<string>) {

        // Guard clause: return "Error" if error from OpenAI
        if(chunkJSON.error !== undefined) {
          console.error("ERROR: OpenAI response has .error property:\n", chunkJSON)
          controller.enqueue(`ERROR: OpenAI returned "${JSON.parse(chunkJSON.error)}"`);
          controller.terminate();
          return;
        }

        const text: any = chunkJSON?.choices?.[0]?.text;

        // Guard clause: return "Error" if malformed JSON
        if (typeof text !== "string") {
          try {
            console.error("ERROR: OpenAI response doesn't have .choices[0].text property:\n", chunkJSON)
            controller.enqueue(`ERROR: OpenAI returned malformed json "${JSON.stringify(chunkJSON)}"`);
          } catch(error) {
            console.error("ERROR: OpenAI returned malformed json:\n", chunkJSON);
            controller.enqueue(`ERROR: OpenAI returned malformed json`);
          }
          controller.terminate();
          return;
        }

        controller.enqueue(text);

      },
    });
  };

  /**
   * Get a stream that sends only 1 string message stating an error
   * @param message message streamed
   * @returns stream
   */
  private getErrorStream(message: string): ReadableStreamDefaultReader<string> {
    return new ReadableStream({
      start(controller: ReadableStreamDefaultController<string>) {
        controller.enqueue(message);
        controller.close();
      },
    }).getReader();
  };


}

class OpenAIJSONResponse {
  public readonly choices: {text: string}[];

  constructor(message: string) {
    this.choices = [{ text: message }];
  };

};

/**
 * @interface IObject
 * @description default `object` type does not allow properties
 */
interface IObject extends Object {
  [key: string]: any;
};
