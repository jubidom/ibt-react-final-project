// ----- CART -----
export const saveCart = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (err) {
    console.error("Error saving cart:", err);
  }
};

export const getCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading cart:", err);
    return [];
  }
};

// ----- WISHLIST -----
export const saveWishlist = (items) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(items));
  } catch (err) {
    console.error("Error saving wishlist:", err);
  }
};

export const getWishlist = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading wishlist:", err);
    return [];
  }
};

// ----- USER -----
export const saveUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

export const getUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error loading user:", err);
    return null;
  }
};

// ----- PRODUCTS (NEW) -----
export const saveProducts = (items) => {
  try {
    localStorage.setItem("products", JSON.stringify(items));
  } catch (err) {
    console.error("Error saving products:", err);
  }
};

export const getProducts = () => {
  try {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading products:", err);
    return [];
  }
};

