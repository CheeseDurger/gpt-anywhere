import { contextMenusFactory, ContextMenusPort } from "../02-ports/output/ContextMenus";
import { DataDTO } from "../02-ports/output/DTO";
import { storageFactory } from "../02-ports/output/Storage";

export class SetContextMenusUseCase {
  private readonly contextMenus: ContextMenusPort;

  constructor() {
    this.contextMenus = contextMenusFactory();
  };

  public handle = async () => {
    const data: DataDTO = await storageFactory().data();
    await this.contextMenus.update(data.prompts);
  };

};
