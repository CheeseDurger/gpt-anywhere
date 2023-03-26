import { DataDTO } from "../../01-shared/StorageDTO";
import { DataResponse } from "../../01-shared/ApiDTO/ApiResponse";
import { storageFactory } from "../02-ports/output/Storage";

export class GetData {
  public async handle(): Promise<DataResponse> {
    const data: DataDTO = await storageFactory().get();
    const response: DataResponse = new DataResponse(true, data);
    return response;
  };
};
