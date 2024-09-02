// // ProductDisplay.js
// import { useContext } from 'react';
// import { ShopContext } from '../../Context/ShopContext';
// import './ProductDisplay.css';
// import star_icon from '../Assets/star_icon.png';
// import star_dull_icon from '../Assets/star_dull_icon.png';

// const ProductDisplay = (props) => {
//     const { product } = props;
//     const { addToCart, cartId } = useContext(ShopContext); // Get cartId from context

//     console.log(product);

//     const handleAddToCart = () => {
//         if (cartId) {
//             addToCart(product.id, 1); // Add to cart with quantity 1
//         } else {
//             console.error("Cart ID is not defined");
//         }
//     };

//     return (
//         <div className="productdisplay">
//             <div className="productdisplay-left">
//                 <div className="productdisplay-img-list">
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                 </div>
//                 <div className="productdisplay-img">
//                     <img className='productdisplay-main-img' src={product.image} alt="" />
//                 </div>
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-stars">
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_dull_icon} alt="" />
//                     <p>(122)</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-old">${product.old_price}</div>
//                     <div className="productdisplay-right-price-new">${product.new_price}</div>
//                 </div>
//                 <div className="productdisplay-right-description">
//                     A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
//                 </div>
//                 <div className="productdisplay-right-size">
//                     <h1>Select Size</h1>
//                     <div className="productdisplay-right-sizes">
//                         <div>S</div>
//                         <div>M</div>
//                         <div>L</div>
//                         <div>XL</div>
//                         <div>XXL</div>
//                     </div>
//                 </div>
//                 <button onClick={handleAddToCart}>ADD TO CART</button>
//                 <p className="productdisplay-right-category">
//                     <span>Category :</span>Women , T-Shirt, Crop Top
//                 </p>
//                 <p className="productdisplay-right-category">
//                     <span>Tags :</span>Modern , Latest
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;

import { useContext,useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, cartId } = useContext(ShopContext); // Get cartId from context
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    console.log(product);

    const handleAddToCart = () => {
        if (cartId) {
            addToCart(product.id); // Add to cart with quantity 1
            alert('Product added to cart successfully!'); // Display success alert
        } else {
            console.error("Cart ID is not defined");
            alert('Failed to add product to cart. Cart ID is not defined.'); // Display error alert
        }
    };
    
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">{'\u20B9'}{product.old_price}</div>
                    <div className="productdisplay-right-price-new">{'\u20B9'}{product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={handleAddToCart}>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    <span>Category :</span>Women , T-Shirt, Crop Top
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags :</span>Modern , Latest
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;

