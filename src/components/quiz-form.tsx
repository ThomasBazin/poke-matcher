'use client';

import { useState, useContext } from 'react';

import { type QuestionType } from '@/data/questions';

import { CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
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
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { answers, setAnswers } = useContext(AnswersContext);

  const currentQuestion = questions[step - 1];
  const currentAnswer = answers[step - 1] || [];

  let currentQuestionMaxAnswers: undefined | number = undefined;
  if (currentQuestion.type === 'checkbox' && currentQuestion.max) {
    currentQuestionMaxAnswers = currentQuestion.max;
  }

  const handleTextChange = (value: string) => {
    setError(null);
    console.log('coucou', value);
    const updatedAnswers = { ...answers };
    updatedAnswers[step] = [value];
    console.log(updatedAnswers);
    setAnswers(updatedAnswers);
  };

  const handleRadioChange = (value: string) => {
    setError(null);
    const updatedAnswers = { ...answers };
    updatedAnswers[step] = [value];
    setAnswers(updatedAnswers);
  };

  const handleCheckboxToggle = (value: string) => {
    if (currentQuestionMaxAnswers) {
      const alreadyChecked = currentAnswer.includes(value);

      let updatedAnswer = [...currentAnswer];
      if (alreadyChecked) {
        updatedAnswer = currentAnswer.filter((answer) => answer !== value);
      } else {
        updatedAnswer = [...currentAnswer, value];
      }

      setError(null);
      setAnswers({ ...answers, [step]: updatedAnswer });
    }
  };

  const isCurrentAnswerValid = (): boolean => {
    switch (currentQuestion.type) {
      case 'text':
        return currentAnswer.length === 1 && currentAnswer[0].trim().length > 0;
      case 'radio':
        return currentAnswer.length === 1;
      case 'checkbox':
        if (currentQuestionMaxAnswers) {
          return (
            currentAnswer.length > 0 &&
            currentAnswer.length <= currentQuestionMaxAnswers
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
      onSubmit();
    }
  };

  return (
    <form onSubmit={goToNextStep} className="w-full h-full flex flex-col">
      {/* Step indicator */}
      <CardHeader className="flex justify-center mb-2">
        {`Question ${step} / ${questions.length}`}
      </CardHeader>

      {/* Question and input for type text */}
      {currentQuestion.type === 'text' && (
        <div className="flex-1">
          <div>
            <h2
              id="question-label"
              className="block text-xl font-semibold mb-4 md:mb-8 text-pretty"
            >
              {currentQuestion.label}
            </h2>
          </div>

          <div>
            <Input
              id="text-response-input"
              type="text"
              value={(currentAnswer.length && currentAnswer[0]) || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              className="mb-6"
              aria-labelledby="question-label"
            />
          </div>
        </div>
      )}

      {/* Question and inputs for type radio */}
      {currentQuestion.type === 'radio' && (
        <>
          <div className="flex-1 overflow-y-auto">
            <fieldset>
              <legend className="block text-xl font-semibold mb-4 md:mb-8">
                {currentQuestion.label}
              </legend>
              <RadioGroup
                value={(currentAnswer.length && currentAnswer[0]) || ''}
                onValueChange={handleRadioChange}
                className="gap-y-5 mb-6"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <RadioGroupItem value={option} id={option} />
                    <label htmlFor={option} className="text-sm font-medium">
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>
          </div>
        </>
      )}

      {/* Question and inputs for type checkbox */}
      {currentQuestion.type === 'checkbox' && (
        <>
          <div className="flex-1">
            <fieldset>
              <legend className="block text-xl font-semibold mb-4 text-pretty">
                {currentQuestion.label}
              </legend>
              <div className="flex flex-col gap-1.5 mb-3">
                {currentQuestionMaxAnswers && (
                  <p className="text-xs text-red-500 mt-1">
                    Select up to {currentQuestionMaxAnswers}
                  </p>
                )}
                {currentQuestion.options.map((option) => {
                  const selected = currentAnswer || [];

                  const processDisabled = () => {
                    if (!currentQuestion.max) return false;
                    return (
                      !selected.includes(option) &&
                      currentQuestion.max <= selected.length
                    );
                  };
                  const disabled = processDisabled();

                  return (
                    <div key={option} className="flex items-center gap-2">
                      <Checkbox
                        id={option}
                        checked={selected.includes(option)}
                        onCheckedChange={() => handleCheckboxToggle(option)}
                        disabled={disabled}
                      />
                      <label htmlFor={option} className="text-sm font-medium">
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </>
      )}
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
