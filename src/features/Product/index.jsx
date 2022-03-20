import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import { Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import DetailPage from './pages/DetailPage';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    const path = useRouteMatch()
    return (
        <Box pt={3}>
            <Switch>
                <Route path={path.path} exact component={ListPage} />
                <Route path={`${path.url}/:productId`} component={DetailPage} />

            </Switch>
        </Box>
    );
}

export default ProductFeature;