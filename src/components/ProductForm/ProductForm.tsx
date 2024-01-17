import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { ProductMutation } from '@/types';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onSubmit: (productData: ProductMutation) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<ProductMutation>({
    title: '',
    price: '',
    description: ''
  });
  
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    console.log(state);
  };
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            required
            id="title"
            type="text"
            label="Title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="price"
            label="Price"
            name="price"
            type="number"
            value={state.price}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            multiline rows={3}
            id="description"
            type="text"
            label="Description"
            name="description"
            value={state.description}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
            type="submit"
            color="success"
            variant="contained"
            disabled={isLoading}
          >
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;