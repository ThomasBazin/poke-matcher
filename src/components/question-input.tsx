import { Input } from '@/components/ui/input';
import { type QuestionInputType } from '@/types/question';

interface QuestionInputPropsInterface {
  question: QuestionInputType;
  prefilledAnswer: string[];
  onChange: (value: string) => void;
}

export default function QuestionInput({
  question,
  prefilledAnswer,
  onChange,
}: QuestionInputPropsInterface) {
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
          value={(prefilledAnswer.length && prefilledAnswer[0]) || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mb-6"
          aria-labelledby="question-label"
        />
      </div>
    </div>
  );
}
