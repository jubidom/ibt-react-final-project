import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts as apiFetchProducts } from "../utils/api";
import { saveProducts, getProducts } from "../utils/storage";

// thunk → fetch from API
export const fetchProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const products = await apiFetchProducts();
    saveProducts(products); // persist to localStorage
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: getProducts(), // load from localStorage first
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ✅ Selectors (shared by Hero & ProductsPage)
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchProducts as apiFetchProducts } from "../utils/api";
// import { saveProducts, getProducts } from "../utils/storage";

// export const fetchProductsThunk = createAsyncThunk(
//   "products/fetchAll",
//   async () => {
//     const products = await apiFetchProducts();
//     saveProducts(products); // ✅ persist after fetching
//     return products;
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: getProducts(), // ✅ load from storage first
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


// export const selectAllProducts = (state) => state.products.items;

// export default productsSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchProducts as apiFetchProducts } from "../utils/api";

// // ✅ Async thunk for fetching products
// export const fetchProductsThunk = createAsyncThunk(
//   "products/fetchAll",
//   async () => {
//     const products = await apiFetchProducts();
//     return products;
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     status: "idle", // idle | loading | succeeded | failed
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

// // ✅ Selectors
// export const selectAllProducts = (state) => state.products.items;
// export const selectProductsStatus = (state) => state.products.status;
// export const selectProductsError = (state) => state.products.error;

// export default productsSlice.reducer;
