import { DataDTO } from "../../../01-shared/StorageDTO";
import { ChromeStorageAdapter } from "../../03-adapters/secondary/ChromeStorage";

export interface StoragePort {
  get: () => Promise<DataDTO>;
  save: (data: DataDTO) => Promise<void>;
  validate: (data: unknown) => DataDTO;
};

export function storageFactory(): StoragePort {
  return new ChromeStorageAdapter();
};
