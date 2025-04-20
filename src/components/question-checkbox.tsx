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
    <div className="flex flex-col h-full overflow-y-auto">
      <fieldset className="flex-1 flex flex-col h-full">
        <legend className="block text-xl font-semibold mb-1 text-pretty">
          {question.label}
        </legend>
        {question.max && (
          <p className="text-xs text-red-500 mt-2 mb-4">
            Select up to {question.max}
          </p>
        )}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2">
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
                <Label htmlFor={option} className="font-medium">
                  {option}
                </Label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
