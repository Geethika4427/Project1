// import { useState } from "react";

// const OrderForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phno: "",
//     address: "",
//     amount: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const createOrder = async () => {
//     console.log("----order creation started -----");
//     const response = await fetch("http://localhost:8080/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         phno: formData.phno,
//         address: formData.address,
//         amount: formData.amount,
//         currency: "INR"
//       })
//     });
//     const order = await response.json();
//     console.log("----Order Creation is completed---- ");
//     return order;
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     const order = await createOrder();
//     console.log(order);

//     const options = {
//       key: "rzp_test_d0XmwTpLEWyJxs", // Replace with your Razorpay key
//       amount: order.amount,
//       currency: "INR",
//       name: order.name,
//       description: "Payment",
//       order_id: order.razorPayOrderId,
//       receipt: order.email,
//       prefill: {
//         name: order.name,
//         email: order.email,
//         contact: order.phno
//       },
//       theme: {
//         color: "#3399cc"
//       }
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   return (
//     <div className="container">
//       <h1>Place your Order Here</h1>
//       <table aria-required="true" aria-autocomplete="none">
//         <h3>Details</h3>
//         <tbody>
//           <tr>
//             <td>
//               <h4>Name</h4>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <h4>Email</h4>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <h4>Phone Number</h4>
//               <input
//                 type="number"
//                 name="phno"
//                 id="phno"
//                 className="form-control"
//                 value={formData.phno}
//                 onChange={handleChange}
//                 minLength="10"
//                 maxLength="10"
//                 required
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <h4>Address</h4>
//               <input
//                 type="text"
//                 name="address"
//                 id="ads"
//                 className="form-control"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <h4>Select Payment method</h4>
//               <select
//                 className="form-select"
//                 name="method"
//                 id="method"
//                 value={formData.method}
//                 onChange={handleChange}
//               >
//                 <option>Select one</option>
//                 <option>Credit/Debit/ATM card</option>
//                 <option>Net Banking</option>
//                 <option>Cash On Delivery</option>
//                 <option>BHIM UPI</option>
//               </select>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <h4>Amount</h4>
//               <input
//                 type="number"
//                 name="amount"
//                 id="amount"
//                 className="form-control"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 required
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <button onClick={handlePayment} className="btn btn-primary">
//                 Proceed to pay
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderForm;

import { useState } from 'react';
import CartItems from '../../components/CartItems';
import axios from 'axios';

const OrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });

  const [cartTotal, setCartTotal] = useState(0); // State to manage the cart total
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    const { name, email, contact, address } = orderDetails;
    const amount = cartTotal; // Ensure this is in paise

    console.log(`Calculated Total: ₹${cartTotal}`);
    console.log(`Amount in paise: ${amount}`);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setErrorMessage('Authentication token is missing.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/create-order', {
        amount,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { razorpayOrderId } = response.data;

      const options = {
        key: 'rzp_test_d0XmwTpLEWyJxs', // Replace with your Razorpay key ID
        amount: amount,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: razorpayOrderId,
        handler: (response) => {
          console.log(response);
          alert('Payment Successful');
        },
        prefill: {
          name: name,
          email: email,
          contact: contact,
        },
        notes: {
          address: address,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
      setErrorMessage('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="order-form-container">
      <h1>Order Form</h1>

      {/* Render CartItems within the OrderForm */}
      <CartItems setCartTotal={setCartTotal} />

      {/* Display cart total */}
      <div className="cart-summary">
        <h2>Cart Total: ₹{cartTotal / 100}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={orderDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={orderDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value=            {orderDetails.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={orderDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;

