/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  SelectChangeEvent,
  createFilterOptions,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { FastField, FormikErrors, FormikTouched, getIn } from 'formik';

import { CreateRecipe, CreateRecipeIngredient } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { ingredientUnits } from '../../common/dictionary';

interface IngredientOption extends Ingredient {
  inputValue?: string;
}

const filter = createFilterOptions<IngredientOption>();

export interface IngredientFormProps extends CreateRecipeIngredient {
  index: number;
  setFieldValue: (field: string, value: string) => void;
  handleChange: (event: React.ChangeEvent<never>) => void;
  handleDelete: (index: number) => void;
  handleModalOpen: (index: number, value: string) => void;
  ingredientsDict: IngredientOption[];
  touched: FormikTouched<CreateRecipe['ingredients']> | undefined;
  error:
    | string
    | string[]
    | FormikErrors<CreateRecipe['ingredients']>
    | undefined;
}

function IngredientForm({
  amount,
  ingredientName,
  ingredientUnitName,
  description,
  handleChange,
  setFieldValue,
  ingredientsDict,
  handleDelete,
  index,
  handleModalOpen,
  error,
  touched,
}: IngredientFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={4}>
        <Autocomplete
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          open={isOpen}
          options={ingredientsDict}
          value={{ name: ingredientName }}
          onOpen={() => {
            setIsOpen(true);
          }}
          onClose={() => {
            setIsOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.name;
            }
            return option.name;
          }}
          onChange={(_, newValue) => {
            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                handleModalOpen(index, newValue);
              });
            } else if (newValue && newValue.inputValue) {
              handleModalOpen(index, newValue.inputValue);
            } else {
              setFieldValue(
                `ingredients.${index}.ingredientName`,
                newValue?.name || ''
              );
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ingredient"
              name={`ingredients.${index}.ingredientName`}
              error={
                getIn(touched, `${index}.ingredientName`) &&
                Boolean(getIn(error, `${index}.ingredientName`))
              }
              helperText={
                getIn(touched, `${index}.ingredientName`) &&
                getIn(error, `${index}.ingredientName`)
              }
            />
          )}
        />
      </Grid>
      <Grid xs={6} md={2}>
        <FastField
          fullWidth
          as={TextField}
          placeholder="Amount..."
          label="Amount"
          type="number"
          name={`ingredients.${index}.amount`}
          value={amount}
          onChange={handleChange}
          error={
            getIn(touched, `${index}.amount`) &&
            Boolean(getIn(error, `${index}.amount`))
          }
          helperText={
            getIn(touched, `${index}.amount`) && getIn(error, `${index}.amount`)
          }
        />
      </Grid>
      <Grid xs={6} md={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="unit">Unit</InputLabel>
          <FastField
            fullWidth
            as={Select}
            label="Unit"
            name={`ingredients.${index}.ingredientUnitName`}
            placeholder="Unit"
            value={ingredientUnitName}
            onChange={
              handleChange as (event: SelectChangeEvent<string>) => void
            }
            inputProps={{
              id: 'unit',
            }}
            error={
              getIn(touched, `${index}.ingredientUnitName`) &&
              Boolean(getIn(error, `${index}.ingredientUnitName`))
            }
            helperText={
              getIn(touched, `${index}.ingredientUnitName`) &&
              getIn(error, `${index}.ingredientUnitName`)
            }
          >
            {ingredientUnits.map((unit) => (
              <MenuItem value={unit} key={unit}>
                {unit}
              </MenuItem>
            ))}
          </FastField>
        </FormControl>
      </Grid>

      <Grid xs={12} md={3}>
        <FastField
          fullWidth
          as={TextField}
          placeholder="Description..."
          label="Optional Description"
          name={`ingredients.${index}.description`}
          value={description}
          onChange={handleChange}
          error={
            getIn(touched, `${index}.description`) &&
            Boolean(getIn(error, `${index}.description`))
          }
          helperText={
            getIn(touched, `${index}.description`) &&
            getIn(error, `${index}.description`)
          }
        />
      </Grid>
      <Grid xs={12} md={1} display="flex" justifyContent="center">
        <IconButton
          sx={{ width: { xs: '100%' } }}
          color="error"
          onClick={() => handleDelete(index)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default React.memo(IngredientForm);
