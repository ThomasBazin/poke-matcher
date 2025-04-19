import { QuestionRadioType } from '@/types/question';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionRadioPropsInterface {
  question: QuestionRadioType;
  prefilledAnswer: string[];
  onChange: (value: string) => void;
}

export default function QuestionRadio({
  question,
  prefilledAnswer,
  onChange,
}: QuestionRadioPropsInterface) {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <fieldset>
          <legend className="block text-xl font-semibold mb-4 md:mb-8">
            {question.label}
          </legend>
          <RadioGroup
            value={(prefilledAnswer.length && prefilledAnswer[0]) || ''}
            onValueChange={onChange}
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
}
