import { QuestionType } from '@/types/question';

import QuestionInput from './question-input';
import QuestionRadio from './question-radio';
import QuestionCheckbox from './question-checkbox';

interface QuestionPropsInterface {
  question: QuestionType;
  answer: string[];
  onChangeValue: (value: string[]) => void;
}

export default function Question({
  question,
  answer,
  onChangeValue,
}: QuestionPropsInterface) {
  let questionMaxAnswers: undefined | number = undefined;
  if (question.type === 'checkbox' && question.max) {
    questionMaxAnswers = question.max;
  }

  const handleChangeValue = (value: string) => {
    let updatedAnswer: string[] = [];

    if (question.type === 'checkbox') {
      if (answer.includes(value)) {
        updatedAnswer = [...answer].filter((answer) => answer !== value);
      }
      if (
        !answer.includes(value) ||
        (questionMaxAnswers && answer.length < questionMaxAnswers)
      ) {
        updatedAnswer = [...answer, value];
      }
    } else {
      updatedAnswer = [value];
    }

    onChangeValue(updatedAnswer);
  };

  if (question.type === 'text')
    return (
      <QuestionInput
        question={question}
        prefilledAnswer={answer}
        onChange={handleChangeValue}
      />
    );

  if (question.type === 'radio')
    return (
      <QuestionRadio
        question={question}
        prefilledAnswer={answer}
        onChange={handleChangeValue}
      />
    );

  if (question.type === 'checkbox')
    return (
      <QuestionCheckbox
        question={question}
        prefilledAnswer={answer}
        onChange={handleChangeValue}
      />
    );

  return null;
}
