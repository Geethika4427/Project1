import './Popular.css';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item-container">
        <div className="popular-item">
          {data_product.map((item, i) => (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular; 
// import { useEffect, useState } from 'react';
// import './Popular.css';
// import Item from '../Item/Item';
// import axios from 'axios';

// const Popular = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         console.log('Retrieved token:', token);

//         const response = await axios.get('http://localhost:8080/api/products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className='popular'>
//       <h1>POPULAR IN WOMEN</h1>
//       <hr />
//       <div className="popular-item-container">
//         <div className="popular-item">
//           {products.map((item) => (
//             <Item
//               key={item.id}
//               id={item.id}
//               name={item.name}
//               image={`http://localhost:8080/uploaded/${item.image}`} // Construct the full image URL
//               new_price={item.new_price}
//               old_price={item.old_price}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popular;


