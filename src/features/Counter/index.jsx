import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { counterSlice } from './counterSlice'
import { useSnackbar } from 'notistack';

function CounterFeature(props) {
    const counter = useSelector(state => state)
    const dispatch = useDispatch()
    const handleIncrease = () => {
      dispatch(counterSlice.actions.increase(counter.counter.count +1))
    } 
    const handleDecrease = () => {
        dispatch(counterSlice.actions.decrease(counter.counter.count -1))
    }
  return (
    <div>
         count: {counter.counter.count} 
        <div>
            <button onClick={handleIncrease}>Increase</button>
            <button onClick={handleDecrease}>Decrease</button>
        </div>
    </div>
  );
}

CounterFeature.propTypes = {}

export default CounterFeature
