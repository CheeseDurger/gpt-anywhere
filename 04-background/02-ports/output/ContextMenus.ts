import { ChromeContextMenusAdapter } from "../../03-adapters/secondary/ChromeContextMenus";
import { PromptEntryDTO } from "./DTO";

export interface ContextMenusPort {
  update: (prompts: PromptEntryDTO[]) => void;
  onClick: (callback: () => Promise<void>) => void;
};

export function contextMenusFactory(): ContextMenusPort {
  return new ChromeContextMenusAdapter();
}