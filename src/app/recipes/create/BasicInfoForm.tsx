import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import FormInput from 'app/ui/input/FormInput';
import FormTextarea from 'app/ui/input/FormTextarea';
import { CreateRecipeState } from 'app/lib/recipe/shema';

const ImageForm = dynamic(() => import('./ImageForm'), { ssr: true });

interface BasicInfoFormProps {
  state: CreateRecipeState;
}

function BasicInfoForm({ state }: BasicInfoFormProps) {
  return (
    <>
      <FormInput
        label="Title"
        type="text"
        id="title"
        name="title"
        placeholder="Title..."
        error={!!state.errors?.title}
        errorMessage={state.errors?.title?.join('. ')}
        required
      />
      <FormTextarea
        label="Description"
        id="description"
        name="description"
        placeholder="Description..."
        error={!!state.errors?.description}
        errorMessage={state.errors?.description?.join('. ')}
        rows={4}
        required
      />
      {/* <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-900"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <FormInput
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
          id="file_input"
          type="file"
        />
      </div> */}
      <Suspense fallback={null}>
        <ImageForm />
      </Suspense>
      <div className="flex flex-col gap-2 md:flex-row">
        <FormInput
          label="Time"
          type="number"
          id="time"
          name="time"
          placeholder="Time..."
          min={0}
          rightAdornment="hour(s)"
        />
        <FormInput
          label="Servings"
          type="number"
          id="servings"
          name="servings"
          placeholder="Servings..."
          min={0}
          required
        />
        <FormInput
          label="Calories"
          type="number"
          id="calories"
          name="calories"
          className="block w-full min-w-0 flex-1 rounded-none rounded-s-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Calories..."
          min={0}
          rightAdornment="kcal"
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <FormInput
          label="Carbs"
          type="number"
          id="carbs"
          name="carbs"
          placeholder="Carbs..."
          min={0}
          required
        />
        <FormInput
          label="Protein"
          type="number"
          id="protein"
          name="protein"
          placeholder="Protein..."
          min={0}
          required
        />
        <FormInput
          label="Fat"
          type="number"
          id="fat"
          name="fat"
          placeholder="Fat..."
          min={0}
          required
        />
      </div>
    </>
  );
}

export default BasicInfoForm;
