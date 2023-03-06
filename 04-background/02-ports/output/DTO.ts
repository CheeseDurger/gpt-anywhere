export interface DataDTO {
  apiKey: string;
  prompts: PromptEntryDTO[];
};

export interface PromptEntryDTO {
  name: string;
  value: string;
};

export interface Model {
  name: string;
  maxTokens: number;
};
