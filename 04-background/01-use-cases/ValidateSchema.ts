import { DataDTO } from "../../01-shared/StorageDTO";
import { storageFactory, StoragePort } from "../02-ports/output/Storage";

export class ValidateSchemaUseCase {

  public async handle(): Promise<void> {
    const storage: StoragePort = storageFactory();
    const unvalidatedData: unknown = await storage.get();
    const validatedData: DataDTO = storage.validate(unvalidatedData);
    await storage.save(validatedData);
  };

};
