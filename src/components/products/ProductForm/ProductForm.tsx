import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { ProductMutation } from '@/types';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '@/components/UI/FileInput/FileInput';

interface Props {
  onSubmit: (productMutation: ProductMutation) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<ProductMutation>({
    title: '',
    price: '',
    description: '',
    image: null
  });
  
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    
    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };
  
  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            required
            id="title" label="Title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="price" label="Price"
            type="number"
            name="price"
            value={state.price}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            multiline rows={3}
            id="description" label="Description"
            name="description"
            value={state.description}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="Product image"
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
          >
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;