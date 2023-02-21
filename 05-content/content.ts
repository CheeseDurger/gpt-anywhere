/// <reference types="chrome-types" />

import { Selector } from "./app/Selector";
import { Spinner } from "./app/Spinner";

/**
 * @description on connection: print completion from OpenAI to the active DOM element
 */
chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  // Guard clause
  if (port.name !== "generate") return;

  const element: HTMLElement | null = new Selector().getActiveElement(document);

  if (element === null) return;

  // Create a html string for loading spinner
  const id: string = Math.floor(Math.random() * 100000000).toString();
  const spinnerId: string = "spinner-gpt-anywhere-" + id;
  const styleId: string = "style-gpt-anywhere-" + id;
  const spinnerString: string = new Spinner().htmlString(spinnerId, styleId);

  // Insert loading spinner
  document.body.insertAdjacentHTML("beforeend", spinnerString);
  port.onDisconnect.addListener( () => {
    // Remove loading spinner
    document.getElementById(spinnerId)?.remove();
    document.getElementById(styleId)?.remove();
  });

  if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
    port.onMessage.addListener((message: string) => {
      let inputOrTeaxtarea: HTMLInputElement | HTMLTextAreaElement = element as HTMLInputElement | HTMLTextAreaElement;
      inputOrTeaxtarea.value += message;
    });
  } else if (element.isContentEditable) {
    port.onMessage.addListener((message: string) => {
      element.textContent += message;
    });
  }

});
