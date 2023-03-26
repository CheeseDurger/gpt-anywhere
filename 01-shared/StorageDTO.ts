export class DataDTO {
  public version: 1 = 1;

  constructor(public apiKey: string, public prompts: PromptDTO[]) {};

  static isDataDTO(data: unknown): data is DataDTO {
    return typeof data === "object"
      && data !== null
      && "version" in data && data.version === 1
      && "apiKey" in data && typeof data.apiKey === "string"
      && "prompts" in data && Array.isArray(data.prompts)
      && data.prompts.every((prompt: any) => PromptDTO.isPromptDTO(prompt));
  };
};

export class PromptDTO {
  constructor(public id: number, public name: string, public value: string) {};

  static isPromptDTO(prompt: unknown): prompt is PromptDTO {
    return typeof prompt === "object"
      && prompt !== null
      && "id" in prompt && typeof prompt.id === "number"
      && "name" in prompt && typeof prompt.name === "string"
      && "value" in prompt && typeof prompt.value === "string";
  };
};
