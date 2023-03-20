import { PortName } from "../../../01-shared/types";
import { BackgroundPort } from "../../02-ports/output/BackgroundPort";

export class ChromeBackgroundAdapter implements BackgroundPort {

  constructor(public readonly writer: WritableStreamDefaultWriter<string>) {};

  public complete(): void {
    chrome.runtime.onConnect.addListener(this.onConnectHandler);
  };

  private onConnectHandler = (port: chrome.runtime.Port) => {

    // Guard clause: port opened from extension
    if (port?.sender?.id !==  chrome.runtime.id) return;

    // Guard clause: right port name
    if (port.name !== PortName.COMPLETE) return;

    port.onMessage.addListener((message: string) => {
      this.writer.write(message);
    });

    port.onDisconnect.addListener( () => {
      this.writer.close();
      chrome.runtime.onConnect.removeListener(this.onConnectHandler);
    });

  };

};
