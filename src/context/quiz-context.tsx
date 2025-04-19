'use client';

import { MatchedPokemonType } from '@/types/matched-pokemon';
import { createContext, Dispatch, useReducer } from 'react';

type QuizStateType = {
  step: number;
  answers: Record<number, string[]>;
  isFormSubmitted: boolean;
  error: string | null;
  loading: boolean;
  matchedPokemon: MatchedPokemonType | undefined;
};

type QuizActionType =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_ANSWERS'; payload: string[] }
  | { type: 'SET_FORM_SUBMITTED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_MATCHED_POKEMON'; payload: MatchedPokemonType | undefined };

const initialQuizState: QuizStateType = {
  step: 1,
  answers: {},
  isFormSubmitted: false,
  error: null,
  loading: false,
  matchedPokemon: undefined,
};

export const QuizContext = createContext<QuizStateType>(initialQuizState);
export const QuizDispatchContext = createContext<Dispatch<QuizActionType>>(
  () => {}
);

function quizReducer(quizState: QuizStateType, action: QuizActionType) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...quizState, step: action.payload, error: null };

    case 'SET_ANSWERS':
      return {
        ...quizState,
        answers: {
          ...quizState.answers,
          [quizState.step]: action.payload,
        },
        error: null,
      };

    case 'SET_FORM_SUBMITTED':
      return { ...quizState, isFormSubmitted: action.payload, error: null };

    case 'SET_ERROR':
      return { ...quizState, error: action.payload };

    case 'SET_LOADING':
      return { ...quizState, loading: action.payload };

    case 'SET_MATCHED_POKEMON':
      return { ...quizState, matchedPokemon: action.payload };
  }
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [quiz, dispatch] = useReducer(quizReducer, initialQuizState);

  return (
    <QuizContext.Provider value={quiz}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
}
