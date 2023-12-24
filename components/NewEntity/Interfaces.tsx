export enum InputType {
    DATE,
    TEXT,
    MULTILINE_TEXT,
  }

  
  export interface Input {
    attributeName: string,
    type: InputType,
    name?: string,
    value?: string,
    required?: boolean,
  }