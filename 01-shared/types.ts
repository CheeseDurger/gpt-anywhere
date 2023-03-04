export interface PromptDTO {
    name: string;
    value: string;
};

export interface Context {
    substitution: string;
};

export interface Model {
    name: string;
    maxTokens: number;
};
