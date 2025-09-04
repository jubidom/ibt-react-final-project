// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import wishlistReducer from "./wishlistSlice";
// import userReducer from "./userSlice";
// import productsReducer from "./productsSlice"; 
// import { saveCart, saveWishlist, saveUser } from "../utils/storage";

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     user: userReducer,
//     products: productsReducer, 
//   },
// });

// //  Persist to localStorage whenever cart or wishlist changes
// store.subscribe(() => {
//   const state = store.getState();
//   saveCart(state.cart.items);
//   saveWishlist(state.wishlist.items);
//   saveUser(state.user.info);
// });

// export default store;



import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import userReducer from "./userSlice";
import productsReducer from "./productsSlice"; 
import { saveCart, saveWishlist, saveUser } from "../utils/storage";

// 🟢 Main Redux store → combines all slices
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    products: productsReducer, 
  },
});

//  Persist state to localStorage whenever it changes
// (so cart/wishlist/user survive a refresh)
store.subscribe(() => {
  const state = store.getState();
  saveCart(state.cart.items);
  saveWishlist(state.wishlist.items);
  saveUser(state.user.info);
});

export default store;