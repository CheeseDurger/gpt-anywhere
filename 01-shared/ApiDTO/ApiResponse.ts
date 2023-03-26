import { DataDTO } from "../StorageDTO";

export class ApiResponse {
  constructor(
    public success: boolean,
    public data: unknown,
  ) {};

  static isApiResponse(response: unknown): response is ApiResponse {
    return typeof response === 'object'
      && response !== null
      && "success" in response && typeof response.success === "boolean"
      && "data" in response;
  };
};

export class DataResponse extends ApiResponse {
  constructor(
    public success: boolean,
    public data: DataDTO,
  ) {
    super(success, data);
  };

  static isDataResponse(response: unknown): response is DataResponse {
    return ApiResponse.isApiResponse(response)
      && DataDTO.isDataDTO(response.data);
  };
};
