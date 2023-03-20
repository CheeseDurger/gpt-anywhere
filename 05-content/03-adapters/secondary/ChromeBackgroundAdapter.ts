import { PortName } from "../../../01-shared/types";
import { Modal } from "../../01-use-cases/modal/Modal";
import { BackgroundPort } from "../../02-ports/output/BackgroundPort";

export class ChromeBackgroundAdapter implements BackgroundPort {

  public async complete(): Promise<void> {
    chrome.runtime.onConnect.addListener(this.onConnectHandler);
  };

  private onConnectHandler(port: chrome.runtime.Port): void {

    // Guard clause: port opened from extension
    if (port?.sender?.id !==  chrome.runtime.id) return;

    // Guard clause: right port name
    if (port.name !== PortName.COMPLETE) return;

    const modal = new Modal().open();

    port.onMessage.addListener((message: string) => {
      modal.addText(message);
    });

    port.onDisconnect.addListener( () => {
      modal.stopText();
      chrome.runtime.onConnect.removeListener(this.onConnectHandler);
    });

  };

};
