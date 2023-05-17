import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Field, FormikErrors, FormikTouched } from 'formik';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Button,
} from '@mui/material';

import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from '../../services/recipes';
import CreateNameModal from './CreateNameModal';
import { CreateRecipe } from '../../models/recipe';

interface CategoriesFormProps {
  categories: CreateRecipe['categories'];
  setFieldValue: (field: string, value: CreateRecipe['categories']) => void;
  touched: FormikTouched<CreateRecipe['categories']> | undefined;
  error:
    | string
    | string[]
    | FormikErrors<CreateRecipe['categories']>
    | undefined;
}

function CategoriesForm({
  categories,
  setFieldValue,
  error,
  touched,
}: CategoriesFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryTyping, setCategoryTyping] = useState<string>('');

  const { data, isLoading } = useGetCategoriesQuery(undefined);
  const [createCategory] = useCreateCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateCategory = (value: string) => {
    if (!value.trim()) return;

    createCategory({ name: value })
      .unwrap()
      .then((payload) =>
        setFieldValue('categories', [
          ...categories,
          { categoryName: payload.name },
        ])
      )
      .then(() =>
        enqueueSnackbar('Category successfully created.', {
          variant: 'success',
        })
      )
      .catch(() =>
        enqueueSnackbar('Something went wrong during category creation.', {
          variant: 'error',
        })
      );
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Autocomplete
        multiple
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        includeInputInList
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        isOptionEqualToValue={(option, value) =>
          option.categoryName === value.categoryName
        }
        getOptionLabel={(option) => option.categoryName}
        options={data?.data.map(({ name }) => ({ categoryName: name })) || []}
        value={categories}
        inputValue={categoryTyping}
        onInputChange={(e, value) => setCategoryTyping(value)}
        onChange={(_, value) => setFieldValue('categories', value)}
        noOptionsText={
          <Button fullWidth onClick={handleModalOpen}>
            Create Category
          </Button>
        }
        loading={isLoading}
        renderInput={(params) => (
          <Field
            component={TextField}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            name="categories"
            label="Categories"
            error={touched && Boolean(error)}
            helperText={touched && error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <CreateNameModal
        open={isModalOpen}
        onChange={setIsModalOpen}
        onSuccess={handleCreateCategory}
        initialValue={categoryTyping}
        description="Create new category to add to database. You can use this category in
        all new recipes."
        title="Create"
        label="Category"
      />
    </>
  );
}

export default React.memo(CategoriesForm);
