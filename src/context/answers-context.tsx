'use client';
import { createContext, useContext, useState } from 'react';

type AnswerType = Record<number, string[]>;
type AnswersContextType = {
  answers: AnswerType | null;
  setAnswers: (a: Record<number, string[]>) => void;
};

const AnswersContext = createContext<AnswersContextType | undefined>(undefined);

export default function AnswersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [answers, setAnswers] = useState<AnswerType | null>(null);
  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
}

export const useAnswers = () => {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error('useAnswers must be used within an Answers Provider');
  }
  return context;
};
