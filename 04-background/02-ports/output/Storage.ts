import { chromeStorageAdapter } from "../../03-adapters/secondary/ChromeStorage";
import { DataDTO } from "./DTO";

export interface StoragePort {
  data: () => Promise<DataDTO>;
};

export function storageFactory(): StoragePort {
  return chromeStorageAdapter;
};
export { DataDTO };

