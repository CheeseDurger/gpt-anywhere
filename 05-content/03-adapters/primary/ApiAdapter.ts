import { CompleteUseCase } from "../../01-use-cases/CompleteUseCase";
import { PortName } from "../../../01-shared/types";
import { OpenRequest } from "../../../01-shared/ApiDTO/ApiRequest";
import { OpenUseCase } from "../../01-use-cases/OpenUseCase";

export class ApiAdapter {
  /**
   * Register message handlers for the extension's API.
   */
  public init(): void {

    // Register function to open Modal
    chrome.runtime.onMessage.addListener(this.open);

    // Register function to print completion
    //
    // The callback of `.onMessage` should return `true` to keep 
    // the internal messaging channel open so that sendResponse()
    // can work asynchronously.
    chrome.runtime.onConnect.addListener(this.complete);

  };

  private open(request: unknown, sender:  chrome.runtime.MessageSender, sendResponse: (response: any) => void): boolean {
    if (!OpenRequest.isOpenRequest(request)) return false;
    new OpenUseCase().handle(request);
    return false;
  };

  private complete = async (port: chrome.runtime.Port): Promise<void> => {

    // Guard clause: port opened from extension
    if (port?.sender?.id !==  chrome.runtime.id) return;

    // Guard clause: right port name
    if (port.name !== PortName.COMPLETE) return;

    // const reader: ReadableStreamDefaultReader<string> = this.getReader(port);
    const reader: ReadableStreamDefaultReader<string> = new CompletionReader(port);
    await new CompleteUseCase().handle(reader);

  };

  // private getReader(port: chrome.runtime.Port): ReadableStreamDefaultReader<string> {
  //   return new ReadableStream({
  //     start(controller) {
  //       port.onMessage.addListener((message: string) => {
  //         controller.enqueue(message);
  //       });
  //       port.onDisconnect.addListener( () => {
  //         controller.close();
  //       });
  //     },
  //   }).getReader();
  // };

};

class CompletionReader extends ReadableStreamDefaultReader<string> {
  constructor(port: chrome.runtime.Port) {
    super(new ReadableStream({
      start(controller) {
        port.onMessage.addListener((message: string) => {
          controller.enqueue(message);
        });
        port.onDisconnect.addListener( () => {
          controller.close();
        });
      },
    }));
  };
}