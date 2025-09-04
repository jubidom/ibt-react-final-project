// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchProducts as apiFetchProducts } from "../utils/api";
// import { saveProducts, getProducts } from "../utils/storage";

// // thunk → fetch from API
// export const fetchProductsThunk = createAsyncThunk(
//   "products/fetchAll",
//   async () => {
//     const products = await apiFetchProducts();
//     saveProducts(products); // persist to localStorage
//     return products;
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: getProducts(), // load from localStorage first
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProductsThunk.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProductsThunk.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchProductsThunk.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// // Selectors (shared by Hero & ProductsPage)
// export const selectAllProducts = (state) => state.products.items;
// export const selectProductsStatus = (state) => state.products.status;
// export const selectProductsError = (state) => state.products.error;

// export default productsSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts as apiFetchProducts } from "../utils/api";
import { saveProducts, getProducts } from "../utils/storage";

// 🟢 Async thunk → fetch products from API
// Redux will auto-generate pending/fulfilled/rejected actions
export const fetchProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const products = await apiFetchProducts();
    saveProducts(products); // persist in localStorage (hydration fallback)
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: getProducts(), // Hydration: prefill from localStorage if available
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 While loading → UI can show spinner
      .addCase(fetchProductsThunk.pending, (state) => {
        state.status = "loading";
      })
      // ✅ Success → overwrite state.items
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      // ❌ Failure → show error in UI
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 🔎 Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
