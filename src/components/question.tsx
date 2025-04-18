import { QuestionType } from '@/types/question';

import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
        !answer.includes(value) &&
        questionMaxAnswers &&
        answer.length < questionMaxAnswers
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
      <div className="flex-1">
        <div>
          <h2
            id="question-label"
            className="block text-xl font-semibold mb-4 md:mb-8 text-pretty"
          >
            {question.label}
          </h2>
        </div>

        <div>
          <Input
            id="text-response-input"
            type="text"
            value={(answer.length && answer[0]) || ''}
            onChange={(e) => handleChangeValue(e.target.value)}
            className="mb-6"
            aria-labelledby="question-label"
          />
        </div>
      </div>
    );

  if (question.type === 'radio')
    return (
      <>
        <div className="flex-1 overflow-y-auto">
          <fieldset>
            <legend className="block text-xl font-semibold mb-4 md:mb-8">
              {question.label}
            </legend>
            <RadioGroup
              value={(answer.length && answer[0]) || ''}
              onValueChange={handleChangeValue}
              className="gap-y-5 mb-6"
            >
              {question.options.map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-sm font-medium">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
      </>
    );

  if (question.type === 'checkbox')
    return (
      <>
        <div className="flex-1">
          <fieldset>
            <legend className="block text-xl font-semibold mb-4 text-pretty">
              {question.label}
            </legend>
            <div className="flex flex-col gap-1.5 mb-3">
              {questionMaxAnswers && (
                <p className="text-xs text-red-500 mt-1">
                  Select up to {questionMaxAnswers}
                </p>
              )}
              {question.options.map((option) => {
                const selected = answer || [];

                const isOptionDisabled = () => {
                  if (!question.max) return false;
                  return (
                    !selected.includes(option) &&
                    question.max <= selected.length
                  );
                };

                return (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={option}
                      checked={selected.includes(option)}
                      onCheckedChange={() => handleChangeValue(option)}
                      disabled={isOptionDisabled()}
                    />
                    <Label htmlFor={option} className="text-sm font-medium">
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
      </>
    );
}
