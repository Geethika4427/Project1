// import './Navbar.css'
// import { useContext, useState } from 'react';
// import  logo1 from '../Assets/logo1.jpeg';
// import cart_icon from '../Assets/cart_icon.png'
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
// const Navbar = () => {

//     const [menu,setMenu] = useState("shop");
//     const {getTotalCartItems} = useContext(ShopContext)
//   return (
//  <div className='Navbar'>
//     <div className="nav-logo">
//     <img src={logo1} alt="Logo" style={{ width: '120px', height: '80px' }}/>
//     <i style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#FF4081', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>FAB FASHION</i>
//   </div>
//   <ul className="nav-menu">
//     <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to="/">Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
//     <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to="/mens">Men</Link>{menu==="mens"?<hr/>:<></>}</li> 
//     <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to="/womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
//     <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to="/kids">Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
//   </ul>
//   <div className="nav-login-cart">
//         <Link to="/login" style={{ textDecoration: 'none' }}>
//           <button>Login</button>
//         </Link>
//     <Link to="/cart" style={{ textDecoration: 'none' }}>
//     <img src={cart_icon} alt="cart_icon" /></Link>
//     <div className="nav-cart-count">{getTotalCartItems()}</div>
//   </div>
// </div>

//   )
// }

// export default Navbar


// import './Navbar.css';
// import { useContext, useState, useEffect } from 'react';
// import logo1 from '../Assets/logo1.jpeg';
// import cart_icon from '../Assets/cart_icon.png';
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';


// const Navbar = () => {
//     const [menu, setMenu] = useState("shop");
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const { getTotalCartItems } = useContext(ShopContext);


//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 const totalItems = await getTotalCartItems();
//                 setCartItemCount(totalItems);
//             } catch (error) {
//                 console.error("Error fetching cart items:", error);
//                 setCartItemCount(0); // Set default value or handle error as needed
//             }
//         };

//         fetchCartItems();
//     }, [getTotalCartItems]);

//     return (
//         <div className='Navbar'>
//             <div className="nav-logo">
//                 <img src={logo1} alt="Logo" style={{ width: '120px', height: '80px' }} />
//                 <i style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#FF4081', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
//                     FAB FASHION
//                 </i>
//             </div>
//             <ul className="nav-menu">
//                 <li onClick={() => { setMenu("shop") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/">Shop</Link>
//                     {menu === "shop" ? <hr /> : <></>}
//                 </li>
//                 <li onClick={() => { setMenu("mens") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/mens">Men</Link>
//                     {menu === "mens" ? <hr /> : <></>}
//                 </li>
//                 <li onClick={() => { setMenu("womens") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/womens">Women</Link>
//                     {menu === "womens" ? <hr /> : <></>}
//                 </li>
//                 <li onClick={() => { setMenu("kids") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>
//                     {menu === "kids" ? <hr /> : <></>}
//                 </li>
//             </ul>
//             <div className="nav-login-cart">
//                 <Link to="/login" style={{ textDecoration: 'none' }}>
//                     <button>Login</button>
//                 </Link>
//                 <Link to="/cart" style={{ textDecoration: 'none' }}>
//                     <img src={cart_icon} alt="cart_icon" />
//                 </Link>
//                 <div className="nav-cart-count">{cartItemCount}</div>
                
//             </div>
//         </div>
//     );
// };

// export default Navbar;

// import './Navbar.css';
// import { useContext, useState, useEffect } from 'react';
// import logo1 from '../Assets/logo1.jpeg';
// import cart_icon from '../Assets/cart_icon.png';
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';

// const Navbar = () => {
//     const [menu, setMenu] = useState("shop");
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const { getTotalCartItems } = useContext(ShopContext);

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 const totalItems = await getTotalCartItems();
//                 console.log('Fetched cart item count:', totalItems); // Debug log
//                 setCartItemCount(totalItems);
//             } catch (error) {
//                 console.error("Error fetching cart items:", error);
//                 setCartItemCount(0); // Set default value or handle error as needed
//             }
//         };

//         fetchCartItems();
//     }, [getTotalCartItems]);

//     return (
//         <div className='Navbar'>
//             <div className="nav-logo">
//                 <img src={logo1} alt="Logo" style={{ width: '120px', height: '80px' }} />
//                 <i style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#FF4081', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
//                     FAB FASHION
//                 </i>
//             </div>
//             <ul className="nav-menu">
//                 <li onClick={() => { setMenu("shop") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/">Shop</Link>
//                     {menu === "shop" ? <hr /> : <></>}
//                 </li>
//                 <li onClick={() => { setMenu("mens") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/mens">Men</Link>
//                     {menu === "mens" ? <hr /> : <></>}
//                 </li>
//                 <li onClick={() => { setMenu("womens") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/womens">Women</Link>
//                     {menu === "womens" ? <hr /> : <></>}
//                 </li>
//                 <li onClick={() => { setMenu("kids") }}>
//                     <Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>
//                     {menu === "kids" ? <hr /> : <></>}
//                 </li>
//             </ul>
//             <div className="nav-login-cart">
//                 <Link to="/login" style={{ textDecoration: 'none' }}>
//                     <button>Login</button>
//                 </Link>
//                 <Link to="/cart" style={{ textDecoration: 'none' }}>
//                     <img src={cart_icon} alt="cart_icon" />
//                 </Link>
//                 <div className="nav-cart-count">{cartItemCount}</div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import './Navbar.css';
import { useState, useEffect,useContext } from 'react';
import logo1 from '../Assets/logo1.jpeg';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';


const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [cartItemCount, setCartItemCount] = useState(0);
    const { getTotalCartItems } = useContext(ShopContext);

    const fetchCartItemCount = async () => {
        const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

        try {
            const response = await axios.get('http://localhost:8080/api/cart-items/count', {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in request headers
                }
            });

            setCartItemCount(response.data || 0); // Adjust according to your backend response
        } catch (error) {
            console.error("Error fetching cart item count:", error);
            setCartItemCount(0);
        }
    };

    useEffect(() => {
        fetchCartItemCount();
    }, [getTotalCartItems]); // Dependency array empty means this runs once after initial render

    return (
        <div className='Navbar'>
            <div className="nav-logo">
                <img src={logo1} alt="Logo" style={{ width: '120px', height: '80px' }} />
                <i style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#FF4081', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    FAB FASHION
                </i>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none' }} to="/">Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("mens") }}>
                    <Link style={{ textDecoration: 'none' }} to="/mens">Men</Link>
                    {menu === "mens" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("womens") }}>
                    <Link style={{ textDecoration: 'none' }} to="/womens">Women</Link>
                    {menu === "womens" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("kids") }}>
                    <Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>
                    {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button>Login</button>
                </Link>
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <img src={cart_icon} alt="cart_icon" />
                </Link>
                <div className="nav-cart-count">{cartItemCount > 0 ? cartItemCount : ''}</div> {/* Display count if > 0 */}
            </div>
        </div>
    );
};

export default Navbar;


