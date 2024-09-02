
import './DescriptionBox.css'


const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
         <div className="descriptionbox-nav-box">Description</div>
          <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
         <p>An e-commerce is an online platform thaat facilitates buying and selling of products
            or services over the internet.It serves as a virtual marketplace where businesss and individuals
            can showcase their products,interact with customersand conduct transactions without the need for a physical presence.
            E-commerce websites have gained immense popularity due to their convinience,accessibility,and the global reach they offer.
         </p>
         <p>E-Commerce websites typically display products or services along with detailed descriptions,images,prices, and any available variations(e.g,sizes,colors).
            Each product usually has its own dedicated page with relevant information.
             </p>
      </div>
    </div>
  )
}

export default DescriptionBox