export type QuestionType =
  | {
      type: 'text';
      label: string;
    }
  | {
      type: 'radio';
      label: string;
      options: string[];
    }
  | {
      type: 'checkbox';
      label: string;
      options: string[];
      max?: number;
    };
