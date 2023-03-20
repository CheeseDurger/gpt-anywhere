import { ChromeStorageAdapter } from "../../03-adapters/secondary/ChromeStorage";
import { DataDTO } from "./DTO";

export interface StoragePort {
  get: () => Promise<DataDTO>;
  save: (data: DataDTO) => Promise<void>;
  validate: (data: unknown) => DataDTO;
};

export function storageFactory(): StoragePort {
  return new ChromeStorageAdapter();
};
