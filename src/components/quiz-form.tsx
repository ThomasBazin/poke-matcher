'use client';

import { useState } from 'react';

import { type QuestionType } from '@/types/question';

import Question from '@/components/question';

import { CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PokeBallIcon from '@/components/ui/pokeball-icon';

interface QuizFormPropsInterface {
  questions: QuestionType[];
  onSubmit: (answers: Record<number, string[]>) => Promise<void>;
}

export default function QuizForm({
  questions,
  onSubmit,
}: QuizFormPropsInterface) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const currentQuestion = questions[step - 1];
  const currentAnswer = answers[step] || [];

  const handleAnswerChange = (answer: string[]) => {
    setError(null);
    setAnswers({ ...answers, [step]: answer });
  };

  const isCurrentAnswerValid = (): boolean => {
    switch (currentQuestion.type) {
      case 'text':
        return currentAnswer.length === 1 && currentAnswer[0].trim().length > 0;
      case 'radio':
        return currentAnswer.length === 1;
      case 'checkbox':
        if (currentQuestion.max) {
          return (
            currentAnswer.length > 0 &&
            currentAnswer.length <= currentQuestion.max
          );
        }
        return currentAnswer.length > 0;

      default:
        return false;
    }
  };

  const goToPreviousStep = () => {
    setError(null);
    setStep(step - 1);
  };

  const goToNextStep = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!isCurrentAnswerValid()) {
      setError('Please complete this step before continuing.');
      return;
    }
    setError(null);
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      console.log(answers);
      onSubmit(answers);
    }
  };

  return (
    <form onSubmit={goToNextStep} className="w-full h-full flex flex-col">
      <CardHeader className="flex justify-center mb-2">
        <h1>{`Question ${step} / ${questions.length}`}</h1>
      </CardHeader>

      <Question
        question={currentQuestion}
        answer={currentAnswer}
        onChangeValue={handleAnswerChange}
      ></Question>

      <div className="h-6 mt-1">
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <CardFooter className="justify-between mt-4">
        <Button type="button" onClick={goToPreviousStep} disabled={step === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {step < questions.length ? (
          <Button onClick={goToNextStep} variant="default">
            Next <ArrowRight className="h-4 w-4 mr-2" />
          </Button>
        ) : (
          <Button onClick={goToNextStep} variant="secondary">
            Submit <PokeBallIcon />
          </Button>
        )}
      </CardFooter>
    </form>
  );
}
