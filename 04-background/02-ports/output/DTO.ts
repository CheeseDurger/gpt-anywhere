import { PromptDTO } from "../../../01-shared/types";

export class DataDTO {
  public version: 1 = 1;
  public apiKey: string = "";
  public prompts: PromptDTO[] = [];
};

export interface Model {
  name: string;
  maxTokens: number;
};
