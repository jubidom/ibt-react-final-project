import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import userReducer from "./userSlice";
import productsReducer from "./productsSlice"; // ✅ import
import { saveCart, saveWishlist, saveUser } from "../utils/storage";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    products: productsReducer, // ✅ add here
  },
});

//  Persist to localStorage whenever cart or wishlist changes
store.subscribe(() => {
  const state = store.getState();
  saveCart(state.cart.items);
  saveWishlist(state.wishlist.items);
  saveUser(state.user.info);
});

export default store;





// RECENT
// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import wishlistReducer from "./wishlistSlice";
// import userReducer from "./userSlice";
// import { saveCart, saveWishlist, saveUser } from "../utils/storage";

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     user: userReducer,
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

// export default store;
// With this:

// Cart survives reload.

// Wishlist survives reload.

// User session survives reload (until logout).


