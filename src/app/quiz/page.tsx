'use client';

import { useContext } from 'react';
import { QuizContext, QuizDispatchContext } from '@/context/quiz-context';

import { questions } from '@/data/questions';

import QuizForm from '@/components/quiz-form';
import ErrorMessage from '@/components/error-message';
import Loader from '@/components/loader';

import { submitForm } from '../actions';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const questionsData = questions;
  const router = useRouter();

  const quizState = useContext(QuizContext);
  const dispatch = useContext(QuizDispatchContext);

  const handleSubmitForm = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_FORM_SUBMITTED', payload: true });

      const matchedPokemon = await submitForm(quizState.answers);

      dispatch({ type: 'SET_MATCHED_POKEMON', payload: matchedPokemon });
      router.push('/quiz/result');
    } catch (error) {
      console.error(error);

      return dispatch({
        type: 'SET_ERROR',
        payload: 'An error occured, please try again later.',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  if (quizState.error)
    return <ErrorMessage message={quizState.error}></ErrorMessage>;

  if (quizState.loading)
    return <Loader message="This might take a few minutes."></Loader>;

  return !quizState.isFormSubmitted ? (
    <QuizForm questions={questionsData} onSubmit={handleSubmitForm}></QuizForm>
  ) : null;
}
