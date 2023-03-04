/// <reference types="chrome-types"/>

import { config } from "../01-shared/config";

import { Publisher } from "./app/Publisher";
import { Fetcher } from "./app/Fetcher";
import { Data, getData } from "./app/Storage";
import { ContextMenus } from "./app/ContextMenus";
import { Context } from "../01-shared/types";

/**
 * @description add context menu entries on right click
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install" || details.reason === "update") chrome.runtime.openOptionsPage();
  const data: Data = await getData();
  await new ContextMenus().set(data.prompts);
});

chrome.storage.sync.onChanged.addListener(async () => {
  const data: Data = await getData();
  await new ContextMenus().set(data.prompts);
});

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

/**
 * @description add actions on context menu entries
 */
chrome.contextMenus.onClicked.addListener(async (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) => {
  // Guard clause:
  // - Tabs might be undefined (eg. click outside a tab)
  // - Tabs might not have ids (eg. tabs without ids)
  if (tab?.id === undefined) return;

  const port: chrome.runtime.Port = chrome.tabs.connect(tab.id, { name: "generate" });

  const id: number = (typeof info.menuItemId === "number") ? info.menuItemId: parseInt(info.menuItemId);
  
  try {
    const data: Data = await getData();
    const fetcher: Fetcher = new Fetcher(data.apiKey, config.openai.endpoint, config.openai.model);
    const context: Context = { substitution: info.selectionText ?? "" };
    const reader: ReadableStreamDefaultReader<string> = await fetcher.getCompletion(data.prompts[id], context);
    const publisher: Publisher = new Publisher();
    await publisher.publish(reader, port);
  } catch (error) {
    console.error("ERROR: error from OpenAI servers\n", error);
    port.postMessage("ERROR: error from OpenAI servers");
  }

  port.disconnect();

});
