
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
const Offers = () => {
  return (
    <div className="offers">
       <div className="offers-left">
           <h1 className='exclusive'>Exclusive</h1>
           <h1>offers for you</h1>
           <p>only on best sellers products</p>
           <button>check now</button>
       </div>
       <div className="offers-right">
          <img src={exclusive_image} alt="" />
       </div>
    </div>
  )
}

export default Offers