import { PromptDTO } from "../../../01-shared/StorageDTO";
import { ChromeContextMenusAdapter } from "../../03-adapters/secondary/ChromeContextMenus";

export interface ContextMenusPort {
  update: (prompts: PromptDTO[]) => void;
};

export function contextMenusFactory(): ContextMenusPort {
  return new ChromeContextMenusAdapter();
};
