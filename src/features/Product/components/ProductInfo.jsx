import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.grey[200]}`
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  salePrice: {
    fontSize: theme.typography.h5.fontSize,
    marginRight: theme.spacing(3),
    fontWeight: 400,
  },
  originalPrice: {
    textDecoration: 'line-through',
    marginRight: theme.spacing(2),
  },
  promotionPrice: {},
  priceBox: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(1),
  },
}));
function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box className={classes.salePrice} component="span">
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box className={classes.originalPrice} component="span">
              {formatPrice(originalPrice)}
            </Box>
            <Box className={classes.promotionPrice} component="span">
              {' '}
              -{promotionPercent}%
            </Box>{' '}
          </>
        )}
      </Box>
    </Box>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductInfo;
