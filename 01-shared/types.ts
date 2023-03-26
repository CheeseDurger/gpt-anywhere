export class ContextMenuItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly type: chrome.contextMenus.ItemType,
    public readonly contexts: [chrome.contextMenus.ContextType, ...chrome.contextMenus.ContextType[]],
  ) {};
};

export enum PortName {
  COMPLETE = "complete",
};
