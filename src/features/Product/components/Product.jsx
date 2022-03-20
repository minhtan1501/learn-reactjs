import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';
const useStyles = makeStyles((theme) => ({
  imageBox:{
    position: 'relative',
    overflow: 'hidden',
    '&::before':{
      content: '',
      display: 'block',
      paddingTop:'100%'
    },
    '& > img':{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      margin: 'auto',
      
    },
    '&.ratio-1-1': {
      paddingTop: '100%'
    },
  },
 

}))
function Product({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
    const handleClick = () => {
      history.push(`/products/${product.id}`);
    }
  return (
    <div>
      <Box onClick={handleClick} padding={1} >
        <Box className={`${classes.imageBox} ratio-1-1`}>
        <img  src={thumbnailUrl} width="100%" />

        </Box>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
            {formatPrice(product.salePrice)}
          </Box>
          {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
        </Typography>
      </Box>
    </div>
  );
}

Product.propTypes = {};

export default Product;
