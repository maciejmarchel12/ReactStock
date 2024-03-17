import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
    width: 200,
    height: 300,
    marginBottom: 16, // You can adjust the spacing between cards here
  });
  
  const StyledCardMedia = styled(CardMedia)({
    height: '50%',
    width: '100%',
    objectFit: 'contain',
  });
  
  const InventoryCard = ({ productName, image, productType, barcode, amountAvailable, storeLocation }) => {
    return (
      <StyledCard>
        <StyledCardMedia
          component="img"
          src={image}
          alt={productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {productType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Barcode: {barcode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount Available: {amountAvailable}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Store Location: {storeLocation}
          </Typography>
        </CardContent>
      </StyledCard>
    );
  };
  
  export default InventoryCard;