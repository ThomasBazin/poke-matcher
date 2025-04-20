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

export type QuestionInputType = {
  type: 'text';
  label: string;
};

export type QuestionRadioType = {
  type: 'radio';
  label: string;
  options: string[];
};

export type QuestionCheckboxType = {
  type: 'checkbox';
  label: string;
  options: string[];
  max?: number;
};
