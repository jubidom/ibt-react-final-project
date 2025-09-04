import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import calculateOrderTotals from "../../utils/calculateOrderTotals";
import { selectCartItems, clearCart } from "../../store/cartSlice";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState("USA");

  const { subtotal, shipping, total } = calculateOrderTotals(cartItems, country);

  const handleCountryChange = (e) => setCountry(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      address: e.target.address.value,
      city: e.target.city.value,
      zip: e.target.zip.value,
      phone: e.target.phone.value,
      country: e.target.country.value,
    };

    navigate("/confirmation", { state: { formData, cartItems } });
    dispatch(clearCart());
  };

  return (
    <div className={styles.checkoutPage}>
      <h1>Checkout</h1>
      <div className={styles.checkoutContainer}>
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="address" placeholder="Address" required />
          <input type="text" name="city" placeholder="City" required />
          <input type="number" name="zip" placeholder="Zip" required />
          <input type="number" name="phone" placeholder="Phone" required />
          <select name="country" value={country} onChange={handleCountryChange}>
            <option value="USA">USA</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Place Order</button>
        </form>

        <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
      </div>
    </div>
  );
}


