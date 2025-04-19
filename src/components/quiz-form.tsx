'use client';

import { useState } from 'react';
import { useContext } from 'react';
import { QuizContext, QuizDispatchContext } from '@/context/quiz-context';

import { type QuestionType } from '@/types/question';

import Question from '@/components/question';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PokeBallIcon from '@/components/ui/pokeball-icon';

interface QuizFormPropsInterface {
  questions: QuestionType[];
  onSubmit: () => Promise<void>;
}

export default function QuizForm({
  questions,
  onSubmit,
}: QuizFormPropsInterface) {
  const quizState = useContext(QuizContext);
  const dispatch = useContext(QuizDispatchContext);

  const [localeError, setLocaleError] = useState<string | null>(null);

  const currentQuestion = questions[quizState.step - 1];
  const currentAnswer = quizState.answers[quizState.step] || [];

  const handleAnswerChange = (answer: string[]) => {
    setLocaleError(null);
    dispatch({ type: 'SET_ANSWERS', payload: answer });
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
    setLocaleError(null);
    dispatch({ type: 'SET_STEP', payload: quizState.step - 1 });
  };

  const goToNextStep = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLocaleError(null);
    if (!isCurrentAnswerValid()) {
      setLocaleError('Please complete this step before continuing.');
      return;
    }
    dispatch({ type: 'SET_STEP', payload: quizState.step + 1 });
  };

  const goToSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!isCurrentAnswerValid()) {
      setLocaleError('Please complete this step before continuing.');
      return;
    }
    onSubmit();
  };

  return (
    <form
      onSubmit={quizState.step === questions.length ? goToSubmit : goToNextStep}
      className="w-full h-full flex flex-col"
    >
      <div className="flex justify-center mb-2">
        <h1>{`Question ${quizState.step} / ${questions.length}`}</h1>
      </div>

      <Question
        question={currentQuestion}
        answer={currentAnswer}
        onChangeValue={handleAnswerChange}
      ></Question>

      <div className="h-6 mt-1">
        {localeError && <p className="text-sm text-red-500">{localeError}</p>}
      </div>

      <div className="justify-between mt-4 flex flex-wrap gap-2 sm:flex-row">
        <Button
          onClick={goToPreviousStep}
          disabled={quizState.step === 1}
          type="button"
          className="flex-1 max-w-fit"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {quizState.step < questions.length ? (
          <Button
            onClick={goToNextStep}
            type="button"
            className="flex-1 max-w-fit"
          >
            Next
            <ArrowRight className="h-4 w-4 mr-2 " />
          </Button>
        ) : (
          <Button
            onClick={goToSubmit}
            variant="secondary"
            type="submit"
            className="flex-1 max-w-fit"
          >
            Submit
            <PokeBallIcon />
          </Button>
        )}
      </div>
    </form>
  );
}
