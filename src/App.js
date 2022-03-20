import Header from "components/Header";
import CartFeature from "features/Cart";
import ProductFeature from "features/Product";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import CounterFeature from "./features/Counter";
import Song from "./features/Song";
import Todo from "./features/Todo";
import './index.css'
function App() {
   
  return (
    <div className='app'>
        <Header />
      <Switch>
      <Route path='/Song' component={Song}/>
      <Route path='/Todo' component={Todo}/>
      <Route path='/products' component={ProductFeature} />
      <Route path='/cart' component={CartFeature}/>

      <Route path='/' component={CounterFeature} exact />

      <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
