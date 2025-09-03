import { createSlice } from "@reduxjs/toolkit";
import { getWishlist } from "../utils/storage";

const initialState = { items: getWishlist() };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;
      if (!state.items.find((i) => i.id === product.id)) {
        state.items.push(product);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

