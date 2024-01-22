import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotAvailable from '@/assets/images/no-image-available.png';
import { apiURL } from '@/constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
  
})

interface Props {
  id: string;
  title: string;
  price: number;
  image: string | null;
}

const ProductItem: React.FC<Props> = ({title, price, id, image}) => {
  let cardImage = imageNotAvailable.src;
  
  if (image) {
    cardImage = apiURL + '/' + image;
  }
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <strong>
            Price: {price} KGS
          </strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} href={'/products/' + id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;