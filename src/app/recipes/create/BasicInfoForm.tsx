import clsx from 'clsx';

/* eslint-disable jsx-a11y/label-has-associated-control */
function BasicInfoForm() {
  const inputClass =
    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500';
  const labelClass = 'mb-2 block text-sm font-medium text-gray-900';

  return (
    <>
      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          type="text"
          id="title"
          className={inputClass}
          placeholder="Title..."
          required
        />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          className={inputClass}
          placeholder="Description..."
          rows={4}
          required
        />
      </div>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-900"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
          id="file_input"
          type="file"
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="w-full">
          <label htmlFor="time" className={labelClass}>
            Time
          </label>
          <div className="flex">
            <input
              type="number"
              id="time"
              className={clsx(
                inputClass,
                'block w-full min-w-0 flex-1 rounded-none rounded-s-lg border'
              )}
              placeholder="Time..."
              min={0}
            />
            <span className="rounded-s-0 inline-flex items-center rounded-e-md border border-gray-300 bg-gray-200 px-3 text-sm text-gray-900">
              hour(s)
            </span>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="servings" className={labelClass}>
            Servings
          </label>
          <input
            type="number"
            id="servings"
            className={inputClass}
            placeholder="Servings..."
            min={0}
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="calories" className={labelClass}>
            Calories
          </label>
          <div className="flex">
            <input
              type="number"
              id="calories"
              className="block w-full min-w-0 flex-1 rounded-none rounded-s-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Calories..."
              min={0}
            />
            <span className="rounded-s-0 inline-flex items-center rounded-e-md border border-gray-300 bg-gray-200 px-3 text-sm text-gray-900">
              kcal
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="w-full">
          <label htmlFor="carbs" className={labelClass}>
            Carbs
          </label>
          <input
            type="number"
            id="carbs"
            className={inputClass}
            placeholder="Carbs..."
            min={0}
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="protein" className={labelClass}>
            Protein
          </label>
          <input
            type="number"
            id="protein"
            className={inputClass}
            placeholder="Protein..."
            min={0}
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="fat" className={labelClass}>
            Fat
          </label>
          <input
            type="number"
            id="fat"
            className={inputClass}
            placeholder="Fat..."
            min={0}
            required
          />
        </div>
      </div>
    </>
  );
}

export default BasicInfoForm;
