// import axios from 'axios';


// // Create an instance of axios
// const api = axios.create({
//     baseURL: 'http://localhost:8080/api', // Adjust base URL as needed
//   });
  
//   // Add a request interceptor to include the JWT token in the headers
//   api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   }, error => {
//     return Promise.reject(error);
//   });
  
//   // Define your API functions
//   export const getCartItems = () => {
//     return api.get('/cart-items')
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error fetching cart items:', error);
//         throw error;
//       });
//   };
  

// // export const getCartItems = async () => {
// //     const response = await axios.get(`${API_URL}/cart-items`);
// //     return response.data;
// // };

// // export const getCartByUserId = async (userId) => {
// //     const response = await axios.get(`${API_URL}/carts/${userId}`);
// //     return response.data;
// // };

// // export const addItemToCart = async (userId, item) => {
// //     const response = await axios.post(`${API_URL}/carts/${userId}/items`, item);
// //     return response.data;
// // };

// // export const updateCartItem = async (userId, cartItemId, updatedItem) => {
// //     const response = await axios.put(`${API_URL}/carts/${userId}/items/${cartItemId}`, updatedItem);
// //     return response.data;
// // };

// // export const removeItemFromCart = async (userId, cartItemId) => {
// //     const response = await axios.delete(`${API_URL}/carts/${userId}/items/${cartItemId}`);
// //     return response.data;
// // };

// // export const clearCart = async (userId) => {
// //     await axios.delete(`${API_URL}/carts/${userId}/clear`);
// // };


// apiService.js
import axios from 'axios';

export const getCartItems = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage or another secure place
    try {
        const response = await axios.get('http://localhost:8080/api/cart-items', {
            headers: {
                'Authorization': `Bearer ${token}`, // Use the Bearer token for authorization
            }
        });
        console.log('API Response:', response.data); // Log the response data to see what is being returned
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

