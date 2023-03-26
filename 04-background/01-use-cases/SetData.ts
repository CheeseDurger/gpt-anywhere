import { DataDTO } from "../../01-shared/StorageDTO";
import { storageFactory } from "../02-ports/output/Storage";

export class SetData {
  public async handle(data: DataDTO): Promise<void> {
    await storageFactory().save(data);
  };
};
