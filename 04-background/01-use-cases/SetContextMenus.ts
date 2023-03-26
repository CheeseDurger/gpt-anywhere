import { DataDTO } from "../../01-shared/StorageDTO";
import { contextMenusFactory } from "../02-ports/output/ContextMenus";
import { storageFactory } from "../02-ports/output/Storage";

export class SetContextMenusUseCase {

  public async handle(): Promise<void> {
    const data: DataDTO = await storageFactory().get();
    await contextMenusFactory().update(data.prompts);
  };

};
