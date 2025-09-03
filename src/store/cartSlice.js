import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each item: { id, title, price, qty, image }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //  Add to Cart (increments if exists)
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.qty += 1;
        // return useful info for toast
        return {
          ...state,
          items: [...state.items],
          lastAdded: {
            ...existingItem,
            message: `${existingItem.qty}x ${existingItem.title} in cart`,
          },
        };
      } else {
        const added = { ...newItem, qty: 1 };
        return {
          ...state,
          items: [...state.items, added],
          lastAdded: {
            ...added,
            message: `1x ${added.title} in cart`,
          },
        };
      }
    },

    //  Increment quantity
    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },

    //  Decrement quantity (remove if qty = 0)
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    //  Remove item completely
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    //  Clear all cart
    clearCart: (state) => {
      state.items = [];
    },

    //  Hydrate from loader 
    hydrateFromLoader: (state, action) => {
      state.items = action.payload || [];
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeItem,
  clearCart,
  hydrateFromLoader,
} = cartSlice.actions;

//  Selector: total count for badge
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0);

//  Selector: cart items
export const selectCartItems = (state) => state.cart.items;

//  Selector: last added (for toast)
export const selectLastAdded = (state) => state.cart.lastAdded;

export default cartSlice.reducer;


