'use client';

import { Suspense, useRef } from 'react';
import { useFormState } from 'react-dom';
import dynamic from 'next/dynamic';
import { MDXEditorMethods } from '@mdxeditor/editor';

import { createRecipe } from 'app/lib/recipe/actions';
import { CreateRecipeState } from 'app/lib/recipe/shema';

import BasicInfoForm from './BasicInfoForm';
import { contetntMarkdown } from './editorContentTemplate';

const Editor = dynamic(() => import('./Editor'), { ssr: false });

function CreateForm() {
  const initialState = { message: '', error: {} };
  const editorRef = useRef<MDXEditorMethods | null>(null);

  const createRecipeWithAdditionalInfo = async (
    state: CreateRecipeState,
    formData: FormData
  ) => {
    return createRecipe(state, formData, editorRef.current?.getMarkdown());
  };

  const [state, dispatch] = useFormState(
    createRecipeWithAdditionalInfo,
    initialState
  );

  return (
    <form
      action={dispatch}
      className="flex max-w-5xl grow flex-col gap-3 px-2 py-4"
    >
      <h2 className="text-3xl">Create new recipe</h2>
      <BasicInfoForm state={state} />
      <Suspense fallback={null}>
        <Editor markdown={contetntMarkdown} editorRef={editorRef} />
      </Suspense>
      <p className="py-2 text-red-600">{state.message}</p>
      <button
        type="submit"
        className="text-md w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateForm;
