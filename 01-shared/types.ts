export interface PromptDTO {
  name: string;
  value: string;
};

export interface CompletionRequest {
  apiKey: string;
  savedPrompt: string;
  selectedText: string;
  tab: chrome.tabs.Tab;
};

export class ContextMenuItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly type: chrome.contextMenus.ItemType,
    public readonly contexts: [chrome.contextMenus.ContextType, ...chrome.contextMenus.ContextType[]],
  ) {};
};