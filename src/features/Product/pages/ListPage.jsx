import { Box, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import categoryApi from 'api/categoryApi';
import productApi from 'api/productApi';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import FiltersViewer from '../components/Filters/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: 1,
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const queryParam = useMemo(()=>{
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
      
    }
  },[location.search]) 
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setpagination] = useState({ limit: 9, page: 1, total: 9 });
  // const [filter, setFilter] = useState(() => ({
  //   ...queryParam,
  //   _page: Number.parseInt(queryParam._page) || 1,
  //   _limit: Number.parseInt(queryParam._limit) || 9,
  //   _sort: queryParam._sort || 'salePrice:ASC',
  // }));
  const [category, setCategoryList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(response);
      } catch (err) {
        console.error(err);
      }
    })() 
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination: pagi } = await productApi.getAll(queryParam);
        setProductList(data);
        setpagination(pagi);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    })();
  }, [queryParam]);
  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(queryParam),
  //   });
  // }, [history, queryParam]);
  if (category < 0) return;
  const handlePageChange = (e, page) => {
    // setFilter((pre) => {
    //   return {
    //     ...pre,
    //     _page: page,
    //   };
    // });
    const filter = {
      ...queryParam,
      _page: page,
    }
    history.push({
      pathname:history.location.pathname,
      search: queryString.stringify(filter),
    })

  };
  const handleSortChange = (value) => {
    // setFilter((pre) => {
    //   return {
    //     ...pre,
    //     _sort: value,
    //   };
    // });
    const filter = {
      ...queryParam,
      _sort: value,
    }
    history.push({
      pathname:history.location.pathname,
      search: queryString.stringify(filter),
    })
  };
  const handleFiltersChange = (value) => {
    // setFilter((pre) => {
    //   return {
    //     ...pre,
    //     ...value,
    //   };
    // });
    const filter = {
      ...queryParam,
      ...value
    }
    history.push({
      pathname:history.location.pathname,
      search: queryString.stringify(filter),
    })
  };
  const handleFilterViewerChange = (value) => {
    history.push({
      pathname:history.location.pathname,
      search: queryString.stringify(value),
    })
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParam} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort onChange={handleSortChange} currentSort={queryParam._sort} />
              <FiltersViewer
                filters={queryParam}
                onChange={handleFilterViewerChange}
                category={category}
              />
              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
