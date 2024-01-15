'use client';
import React from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import { Product } from '@/types';
import ProductItem from '@/components/products/ProductItem';

export default function Home() {
  const {data: products, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const productsResponse = await axiosApi.get<Product[]>('/products');
      return productsResponse.data;
    },
  });
  
  let productsArea: React.ReactNode = <CircularProgress/>
  if (!isLoading && products) {
    productsArea = products.map(product => (
      <ProductItem
        key={product.id}
        title={product.title}
        price={product.price}
        id={product.id}
      />
    ))
  }
  
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} href="/products/new">
            Add product
          </Button>
        </Grid>
      </Grid>
      
      <Grid item container spacing={1}>
        {productsArea}
      </Grid>
    </Grid>
  );
}
