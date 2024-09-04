
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getCartItems } from '../../api/apiService'; 
// import './CartItems.css';
// import remove_icon from '../Assets/cart_cross_icon.png';

// const CartItems = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     name: '',
//     email: '',
//     contact: ''
//   });

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const data = await getCartItems(); 
//         console.log('Fetched Cart Items:', data); 
//         setCartItems(data); 
//         setError(null); 
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//         setError('Failed to fetch cart items. Please try again.');
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchCartItems();

//     // Simulate fetching user details (Replace with actual logic)
//     setUserDetails({
//       name: "John Doe", // Replace with logic to get actual user name
//       email: "user@example.com", // Replace with logic to get actual user email
//       contact: "8971116593" // Replace with logic to get actual user contact
//     });
//   }, []);

//   const handleRemove = async (id) => {
//     const token = localStorage.getItem('authToken');
//     try {
//       await axios.delete(`http://localhost:8080/api/cart-items/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCartItems(cartItems.filter((item) => item.id !== id)); 
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   const calculateTotal = () => {
//     const total = cartItems.reduce((acc, item) => {
//       const price = parseFloat(item.product?.new_price) || 0;
//       return acc + price * item.quantity;
//     }, 0);
//     console.log('Calculated Total:', total);
//     return total.toFixed(2);
//   };

//   const handleCheckout = async () => {
//     const amount = calculateTotal() * 100; // Convert to paise
//     if (amount > 1000000) { // 10,00,000 paise = 10,000 INR
//       alert('The total amount exceeds the maximum allowed limit of ₹10,000.');
//       return; 
//     }

//     const token = localStorage.getItem('authToken'); 

//     console.log('Token:', token); 
//     try {
//       const response = await axios.post("http://localhost:8080/api/create-order", {
//         amount,
//         email: userDetails.email
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`, 
//         },
//       });
  
//       const { razopayOrderId } = response.data;

//       const options = {
//         key: "rzp_test_d0XmwTpLEWyJxs", // Replace with your Razorpay key ID
//         amount: amount,
//         currency: "INR",
//         name: "Your Company Name",
//         description: "Test Transaction",
//         order_id: razopayOrderId,
//         handler: async (response) => {
//           console.log(response);
//           alert('Payment Successful');
//           // Handle payment success here
//         },
//         prefill: {
//           name: userDetails.name,  // Populated from state
//           email: userDetails.email,
//           contact: userDetails.contact
//         },
//         notes: {
//           address: "Razorpay Corporate Office"
//         },
//         theme: {
//           color: "#F37254"
//         }
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert('Failed to initiate payment. Please try again.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className='cartitems'>
//       <div className='cartitems-format-main'>
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       <div>
//         {cartItems.map((item) => {
//           const product = item.product;
//           const price = parseFloat(product?.new_price) || 0;
//           const total = price * item.quantity;
//           const imageUrl = `http://localhost:8080/uploaded/${product?.image}`;

//           return (
//             <div key={item.id}>
//               <div className='cartitems-format cartitems-format-main'>
//                 <img
//                   src={imageUrl}
//                   alt={product?.name}
//                   className='carticon-product-icon'
//                   onError={(e) => e.target.src = '/path-to-placeholder-image.jpg'}
//                 />
//                 <p>{product?.name}</p>
//                 <p className='price'> {'\u20B9'}{price.toFixed(2)}</p>
//                 <button className='cartitems-quantity'>{item.quantity}</button>
//                 <p className='newprice'> {'\u20B9'}{total.toFixed(2)}</p>
//                 <img
//                   className='cartitems-remove-icon'
//                   src={remove_icon}
//                   alt='Remove Icon'
//                   onClick={() => handleRemove(item.id)}
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         })}
//         <div className='cartitems-down'>
//           <div className='cartitems-total'>
//             <h1>Cart Totals</h1>
//             <div>
//               <div className='cartitems-total-item'>
//                 <p>Subtotal</p>
//                 <p>{'\u20B9'}{calculateTotal()}</p>
//               </div>
//               <hr />
//               <div className='cartitems-total-item'>
//                 <p>Shipping Fee</p>
//                 <p>Free</p>
//               </div>
//               <hr />
//               <div className='cartitems-total-item'>
//                 <h3>Total</h3>
//                 <h3>{'\u20B9'}{calculateTotal()}</h3>
//               </div>
//             </div>
//             <button onClick={handleCheckout}>Proceed to Checkout</button>
//           </div>
//           <div className='cartitems-promocode'>
//             <p>If you have a promo code, enter it here</p>
//             <div className='cartitems-promobox'>
//               <input type='text' placeholder='Promo code' />
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    contact: '',
    address: ''
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems(); 
        console.log('Fetched Cart Items:', data); 
        setCartItems(data); 
        setError(null); 
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items. Please try again.');
      } finally {
        setLoading(false); 
      }
    };

    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken');
      const userId = 1; // Replace with actual user ID logic

      try {
        const response = await axios.get(`http://localhost:8080/api/user/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId
          }
        });

        const { username, email, street, locality, city, state, country, postalCode, phoneNumber } = response.data;
        setUserDetails({
          name: username,
          email: email,
          contact: phoneNumber, // Set contact from the response
          address: `${street}, ${locality}, ${city}, ${state}, ${country} - ${postalCode}`
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error, e.g., show a message to the user
      }
    };

    fetchCartItems();
    fetchUserDetails();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.new_price) || 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleRemove = async (itemId) => {
    const token = localStorage.getItem('authToken');
    try {
      // API call to remove item from the backend
      await axios.delete(`http://localhost:8080/api/cart-items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the local cartItems state
      setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  const handleCheckout = async () => {
    const amount = calculateTotal() * 100; // Convert to paise
    if (amount > 1000000) { // 10,00,000 paise = 10,000 INR
      alert('The total amount exceeds the maximum allowed limit of ₹10,000.');
      return;
    }

    const token = localStorage.getItem('authToken');

    try {
      const response = await axios.post("http://localhost:8080/api/create-order", {
        amount,
        email: userDetails.email // Use user email
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { razopayOrderId } = response.data;

      const options = {
        key: "rzp_test_d0XmwTpLEWyJxs", // Replace with your Razorpay key ID
        amount: amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: razopayOrderId,
        handler: async (response) => {
          console.log(response);
          alert('Payment Successful');
          // Handle payment success here
        },
        prefill: {
          name: userDetails.name,  // Populate with user details
          email: userDetails.email,
          contact: userDetails.contact
        },
        notes: {
          address: userDetails.address
        },
        theme: {
          color: "#F37254"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert('Failed to initiate payment. Please try again.');
    }
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
          const price = parseFloat(product?.new_price) || 0;
          const total = price * item.quantity;
          const imageUrl = `http://localhost:8080/uploaded/${product?.image}`;

          return (
            <div key={item.id}>
              <div className='cartitems-format cartitems-format-main'>
                <img
                  src={imageUrl}
                  alt={product?.name}
                  className='carticon-product-icon'
                  onError={(e) => e.target.src = '/path-to-placeholder-image.jpg'}
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
            <button onClick={handleCheckout}>proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
