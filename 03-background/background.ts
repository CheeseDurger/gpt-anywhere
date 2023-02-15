/// <reference types="chrome-types"/>

import { config } from "../01-shared/config";

import { Publisher } from "./app/Publisher";
import { Fetcher } from "./app/Fetcher";
import { Data, updateData, getData } from "./app/Storage";
import { ContextMenus } from "./app/ContextMenus";

/**
 * @description add context menu entries on right click
 */
chrome.runtime.onInstalled.addListener(async () => {
  const data: Data = await getData();
  await new ContextMenus().set(data.prompts);
});
chrome.storage.sync.onChanged.addListener(async () => {
  const data: Data = await getData();
  await new ContextMenus().set(data.prompts);
});

/**
 * @description add actions on context menu entries
 */
chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  // Guard clause:
  // - Tabs might be undefined (eg. click outside a tab)
  // - Tabs might not have ids (eg. tabs without ids)
  if (tab === undefined || tab.id === undefined) return;

  const port: chrome.runtime.Port = chrome.tabs.connect(tab.id, { name: "generate" });

  let id: number = (typeof item.menuItemId === "number") ? item.menuItemId : parseInt(item.menuItemId);
  
  // Setup text upon extension's icon
  chrome.action.setBadgeText({text: 'GPT', tabId: tab.id});
  chrome.action.setBadgeBackgroundColor({color: config.ui.color.secondary, tabId: tab.id});

  const data: Data = await getData();
  const fetcher: Fetcher = new Fetcher(data.apiKey, config.openai.endpoint, config.openai.model);
  console.debug("id :", id);
  console.debug("data :", data);
  const reader: ReadableStreamDefaultReader<string> = await fetcher.getCompletion(data.prompts[id]);

  const publisher: Publisher = new Publisher();
  await publisher.publish(reader, port);
  port.disconnect();

  // Disable text upon extension's icon
  chrome.action.setBadgeText({text: "", tabId: tab.id});

});