import React, { useState } from 'react';
import { FieldArray, FormikErrors, FormikTouched } from 'formik';
import { Stack, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import IngredientForm from './IngredientForm';
import { CreateRecipe } from '../../models/recipe';
import {
  useCreateIngredientMutation,
  useGetIngredientsQuery,
} from '../../services/recipes';
import CreateNameModal from './CreateNameModal';

interface IngredientsFormProps {
  ingredients: CreateRecipe['ingredients'];
  setFieldValue: (field: string, value: string) => void;
  handleChange: (event: React.ChangeEvent<never>) => void;
  touched: FormikTouched<CreateRecipe['ingredients']> | undefined;
  error:
    | string
    | string[]
    | FormikErrors<CreateRecipe['ingredients']>
    | undefined;
}

function IngredientsForm({
  ingredients,
  handleChange,
  setFieldValue,
  error,
  touched,
}: IngredientsFormProps) {
  const { data } = useGetIngredientsQuery({});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ingredientTyping, setIngredientTyping] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  const [createIngredient] = useCreateIngredientMutation();

  const handleCreateIngredient = (value: string) => {
    if (!value.trim()) return;

    createIngredient({ name: value })
      .unwrap()
      .then((payload) =>
        setFieldValue(
          `ingredients.${currentIndex}.ingredientName`,
          payload.name
        )
      )
      .then(() =>
        enqueueSnackbar('Ingredient successfully created.', {
          variant: 'success',
        })
      )
      .catch(() =>
        enqueueSnackbar('Something went wrong during ingredient creation.', {
          variant: 'error',
        })
      );
  };

  const handleModalOpen = (index: number, ingredientName: string) => {
    setIsModalOpen(true);
    setCurrentIndex(index);
    setIngredientTyping(ingredientName);
  };

  return (
    <Stack gap={2} width="100%">
      <FieldArray name="ingredients">
        {({ remove, push }) => (
          <>
            {ingredients.map(
              (
                { ingredientName, amount, description, ingredientUnitName },
                idx
              ) => (
                <IngredientForm
                  key={`${idx + ingredientName}`}
                  index={idx}
                  ingredientsDict={data?.data || []}
                  amount={amount}
                  ingredientName={ingredientName}
                  description={description}
                  ingredientUnitName={ingredientUnitName}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  handleDelete={remove}
                  handleModalOpen={handleModalOpen}
                  error={error}
                  touched={touched}
                />
              )
            )}

            <Button
              variant="outlined"
              onClick={() =>
                push({
                  amount: 0,
                  ingredientName: '',
                  ingredientUnitName: '',
                  description: '',
                })
              }
            >
              Add Ingredient
            </Button>
          </>
        )}
      </FieldArray>
      <CreateNameModal
        open={isModalOpen}
        onChange={setIsModalOpen}
        onSuccess={handleCreateIngredient}
        initialValue={ingredientTyping}
        title="Create Ingredient"
        description="Create new ingredient to add to database. You can use this ingredient in
        all new recipes."
        label="Ingredient"
      />
    </Stack>
  );
}

export default React.memo(IngredientsForm);
