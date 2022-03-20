import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
     showMiniCart:false,
     cartItems:[],

  },
  reducers: {
    showMiniCart: (state) => {
      state.showMiniCart = true
    },
    hideMiniCart: (state, action) =>{
        state.showMiniCart = false;
    },
    addTocart: (state, action) =>{
        const newItem = action.payload;

        const index = state.cartItems.findIndex(item => item.id === newItem.id);

        if(index >=0) {
            //increase quantity
            state.cartItems[index].quantity += newItem.quantity;
        }
        else{
            // add to card
            state.cartItems.push(newItem);
        }


    },
    setQuantity: (state, action) =>{
        const {id, quantity} = action.payload;
        // check if product is available in cart
        const index = state.cartItems.findIndex(item => id === item.id);

        if(index>=0){
            state.cartItems[index].quantity = quantity;
        }

    },
    removeFromCart: (state, action) =>{
        const idNeedtoRemove = action.payload;
        state.cartItems = state.cartItems.filter(item => idNeedtoRemove !== item.id)
    }
     
  },
});

const { actions, reducer } = cartSlice;

export const {showMiniCart, hideMiniCart,addTocart,setQuantity,removeFromCart} = actions;

export default reducer;

export {cartSlice};