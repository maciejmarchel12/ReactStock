import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { AuthContext } from '../../contexts/authContext';
import { useTheme } from '../../contexts/themeContext';

const StyledCard = styled(Card)({
    width: 200,
    height: 500,
    marginBottom: 16, // You can adjust the spacing between cards here
  });
  
  const StyledCardMedia = styled(CardMedia)({
    height: '50%',
    width: '100%',
    objectFit: 'contain',
  });
  
  const InventoryCard = ({ _id, productName, image, productType, barcode, amountAvailable, storeLocation, onEdit, onDelete }) => {
    // const history = useNavigate();

    const { isAuthenticated, permissionLevel } = useContext(AuthContext)
    const theme = useTheme();

    console.log('isAuthenticated:', isAuthenticated);
    console.log('permissionLevel:', permissionLevel);

    const handleEdit = () => {
      onEdit({ _id, productName, image, productType, barcode, amountAvailable, storeLocation });
    };

    const handleDelete = () => {
      onDelete(_id);
    }

    return (
      <StyledCard style={{backgroundColor: theme.palette.field.main }}>
        <StyledCardMedia
          component="img"
          src={image}
          alt={productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" title={productName}>
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
          <Button variant="contained" style={{backgroundColor: theme.palette.primary.main }} onClick={handleEdit}>Edit</Button>
          {isAuthenticated && (permissionLevel === 'admin' || permissionLevel === 'manager') && (
            <>
              <Button variant="contained" style={{backgroundColor: theme.palette.secondary.main }} onClick={handleDelete}>Delete</Button>
            </>
          )}
        </CardContent>
      </StyledCard>
    );
  };
  
  export default InventoryCard;