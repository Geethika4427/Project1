// import { useContext } from 'react';
// import './CartItems.css';
// import { ShopContext } from '../../Context/ShopContext';
// import remove_icon from '../Assets/cart_cross_icon.png';

// const CartItems = () => {
//     const { all_product, cartItems, removeFromCart , getTotalCartAmount } = useContext(ShopContext);

//     return (
//         <div className='cartitems'>
//             <div className="cartitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             <div>
//                 {all_product.map((e) => {
//                     if (cartItems[e.id] > 0) {
//                         return (
//                             <div key={e.id}>
//                                 <div className="cartitems-format cartitems-format-main">
//                                     <img src={e.image} alt="" className='carticon-product-icon' />
//                                     <p>{e.name}</p>
//                                     <p className='price'>${e.new_price}</p>
//                                     <button className='cartitems-quantity'>{cartItems[e.id]}</button>
//                                     <p className='newprice'>${e.new_price * cartItems[e.id]}</p>
//                                     <img className='cartitems-remove-icon'
//                                         src={remove_icon}
//                                         onClick={() => removeFromCart(e.id)}
//                                         alt="Remove Icon"
//                                     />
//                                 </div>
//                                 <hr />
//                             </div>
//                         );
//                     }
//                     return null;
//                 })}
//                 <div className="cartitems-down">
//                     <div className="cartitems-total">
//                         <h1>cart totals</h1>
//                         <div>
//                             <div className="cartitems-total-item">
//                                 <p>subtotal</p>
//                                 <p>${getTotalCartAmount()}</p>
//                             </div>
//                             <hr />

//                             <div className="cartitems-total-item">
//                                 <p>shipping fee</p>
//                                 <p>free</p>
//                             </div>
//                             <hr />

//                             <div className="cartitems-total-item">
//                                <h3>total</h3>
//                                <h3>${getTotalCartAmount()}</h3>
//                             </div>
//                         </div>
//                         <button>proceed to checkout</button>
//                     </div>
//                     <div className="cartitems-promocode">
//                         <p>If you have a promo code, Enter it here</p>
//                         <div className="cartitems-promobox">
//                             <input type="text" placeholder='promo code' />
//                             <button>Submit</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CartItems;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCartItems } from '../../api/apiService'; 
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cart items when component mounts
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems(); // Fetch data from the API
        console.log('Fetched Cart Items:', data); // Log data to inspect its structure
        setCartItems(data); // Set the data to state
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:8080/api/cart-items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter((item) => item.id !== id)); // Update state after removing item
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.product?.new_price) || 0;
      return acc + price * item.quantity;
    }, 0);
    console.log('Calculated Total:', total); // Log calculated total
    return total.toFixed(2);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      <div>
        {cartItems.map((item) => {
          const product = item.product;
          const price = parseFloat(product?.new_price) || 0; // Use new_price for price
          const total = price * item.quantity;

          // Ensure the image URL is correct
          const imageUrl = `http://localhost:8080/uploaded/${product?.image}`;

          return (
            <div key={item.id}>
              <div className='cartitems-format cartitems-format-main'>
                <img
                  src={imageUrl}
                  alt={product?.name}
                  className='carticon-product-icon'
                  onError={(e) => e.target.src = '/path-to-placeholder-image.jpg'} // Fallback image
                />
                <p>{product?.name}</p>
                <p className='price'> {'\u20B9'}{price.toFixed(2)}</p>
                <button className='cartitems-quantity'>{item.quantity}</button>
                <p className='newprice'> {'\u20B9'}{total.toFixed(2)}</p>
                <img
                  className='cartitems-remove-icon'
                  src={remove_icon}
                  alt='Remove Icon'
                  onClick={() => handleRemove(item.id)}
                />
              </div>
              <hr />
            </div>
          );
        })}
        <div className='cartitems-down'>
          <div className='cartitems-total'>
            <h1>cart totals</h1>
            <div>
              <div className='cartitems-total-item'>
                <p>subtotal</p>
                <p>{'\u20B9'}{calculateTotal()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <p>shipping fee</p>
                <p>free</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <h3>total</h3>
                <h3>{'\u20B9'}{calculateTotal()}</h3>
              </div>
            </div>
            <button>proceed to checkout</button>
          </div>
          <div className='cartitems-promocode'>
            <p>If you have a promo code, Enter it here</p>
            <div className='cartitems-promobox'>
              <input type='text' placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

