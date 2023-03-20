import { contextMenusFactory } from "../02-ports/output/ContextMenus";
import { DataDTO } from "../02-ports/output/DTO";
import { storageFactory } from "../02-ports/output/Storage";

export class SetContextMenusUseCase {

  public async handle(): Promise<void> {
    const data: DataDTO = await storageFactory().get();
    await contextMenusFactory().update(data.prompts);
  };

};
