import { QuestionCheckboxType } from '@/types/question';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface QuestionCheckboxPropsInterface {
  question: QuestionCheckboxType;
  prefilledAnswer: string[];
  onChange: (value: string) => void;
}

export default function QuestionCheckbox({
  question,
  prefilledAnswer,
  onChange,
}: QuestionCheckboxPropsInterface) {
  return (
    <>
      <div className="flex-1">
        <fieldset>
          <legend className="block text-xl font-semibold mb-4 text-pretty">
            {question.label}
          </legend>
          <div className="flex flex-col gap-1.5 mb-3">
            {question.max && (
              <p className="text-xs text-red-500 mt-1">
                Select up to {question.max}
              </p>
            )}
            {question.options.map((option) => {
              const selected = prefilledAnswer || [];

              const isOptionDisabled = () => {
                if (!question.max) return false;
                return (
                  !selected.includes(option) && question.max <= selected.length
                );
              };

              return (
                <div key={option} className="flex items-center gap-2">
                  <Checkbox
                    id={option}
                    checked={selected.includes(option)}
                    onCheckedChange={() => onChange(option)}
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
