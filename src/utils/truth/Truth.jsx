🔹 Step 1: Redux Store

Redux is like our manager’s notebook.
It keeps track of:

What’s in the cart

What’s in the wishlist

Who the user is

Which products we have

This is all inside one file called store.js.

🔹 Step 2: Slices

Each department has its own “mini-notebook” (slice):

cartSlice → tracks cart items

wishlistSlice → tracks wishlist items

userSlice → tracks user info

productsSlice → tracks product list

Each slice knows how to:

Add / remove items

Update quantities

Load from outside (API or storage)

🔹 Step 3: LocalStorage

Now, if Redux is just a notebook, what happens when the app closes?
👉 The notebook gets wiped clean!

So we use localStorage as a backup drawer.

When you add to cart → it’s written in Redux and saved to localStorage.

When you refresh the page → Redux checks localStorage first and restores the data.

That’s why your cart, wishlist, and even products don’t disappear after refresh.

🔹 Step 4: Fetching Products

When the app first loads:

We check if products already exist in localStorage.

If yes → just use them.

If no → fetch them from the API, then save them in Redux and localStorage.

This way:

You don’t fetch from the internet every time unnecessarily.

You don’t get a blank page saying “No products found”.

🔹 Step 5: Hero & Products Page

Hero Section → Shows a few “featured” products (like promotions in front of a supermarket).

Products Page → Shows the full list of products with filters and search.

Both of these pages read from Redux store.
So as long as products are in Redux (or restored from localStorage), they’ll always display correctly.

✅ In summary:

Redux = keeps everything in one place while app is running.

localStorage = keeps everything safe when you close/refresh.

Slices = mini-helpers for each department (cart, wishlist, user, products).

Hero/Products page = just display what Redux already has.




Checkout Flow Blueprint
1️⃣ Components / Pages
Component / Page	Role
CheckoutPage	Collects user info: name, email, address, city, zip, country. Shows shipping form conditionally for non-USA users. Integrates OrderSummary for live totals. Handles form submission.
OrderSummary	Reads cart items from Redux. Calculates subtotal, shipping (via calculateShipping), and total. Displays all prices formatted with formatPrice.
ConfirmationPage	Displays order confirmation after submission. Shows user info, order summary, subtotal, shipping, total, all formatted.
2️⃣ Data / State Flow
Redux Store (cartSlice)
    └── cartItems[] → contains {id, name, price, quantity}

CheckoutPage
    ├── formData → {name, email, address, city, zip, country}
    ├── subtotal → calculateTotal(cartItems)
    ├── shipping → calculateShipping(formData.country)
    └── total → subtotal + shipping

OrderSummary (child component)
    ├── Reads cartItems from Redux
    ├── Reads subtotal, shipping, total from CheckoutPage props
    └── Displays formatted prices using formatPrice()

3️⃣ Shipping Logic

Country = USA → Shipping = $0 → No extra fields

Country ≠ USA → Shipping = $20 → Show extra shipping/customs fields if needed

Function used: calculateShipping(country)