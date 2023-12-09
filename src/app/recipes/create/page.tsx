import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { contetntMarkdown } from './editorContentTemplate';
import BasicInfoForm from './BasicInfoForm';

const Editor = dynamic(() => import('./Editor'), { ssr: false });

/* eslint-disable jsx-a11y/label-has-associated-control */
export default async function Page() {
  return (
    <form action="" className="flex max-w-5xl grow flex-col gap-3 px-2 py-4">
      <h2 className="text-3xl">Create new recipe</h2>
      <BasicInfoForm />
      <Suspense fallback={null}>
        <Editor markdown={contetntMarkdown} />
      </Suspense>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
}
