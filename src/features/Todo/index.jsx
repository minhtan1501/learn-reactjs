import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route, useRouteMatch,useLocation} from 'react-router-dom'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'


function TodoFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
      <Route path={match.path} component={ListPage} exact/>
      <Route path={`${match.path}/:todoid`} component={DetailPage} exact/>
      </Switch>
    </div>
  )
}

TodoFeature.propTypes = {}

export default TodoFeature
