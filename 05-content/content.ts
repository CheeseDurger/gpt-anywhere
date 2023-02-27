/// <reference types="chrome-types" />

import { Modal } from "./app/Modal";

/**
 * @description on connection: print completion from OpenAI to the active DOM element
 */
chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  // Guard clause
  if (port.name !== "generate") return;

  const modal: Modal = new Modal().open();

  port.onMessage.addListener((message: string) => {
    modal.addText(message);
  });

  port.onDisconnect.addListener( () => {
    modal.stopText();
  });

});
