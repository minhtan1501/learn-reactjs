import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { addTocart } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumnail from '../components/ProductThumnail';
import useProductDetail from '../hooks/useProductDetail';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },

  left: {
    width: '250px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: 1,
    padding: theme.spacing(1.5),
  },
}));
function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    url,
    params: { productId },
  } = useRouteMatch();
  const { product, loading } = useProductDetail(productId);
  if (loading) {
    return (
      <Box ml="50%">
        <CircularProgress />
      </Box>
    );
  }
  const handleAddtoCartSubmit = ({ quantity }) => {
    const action = addTocart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumnail product={{}} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddtoCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />

        <Switch>
          <Route path={`${url}/description`}>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`}>
            <ProductAdditional product={product} />
          </Route>
          <Route path={`${url}/reviews`}>
            <ProductReviews product={product} />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

DetailPage.propTypes = {};

export default DetailPage;
