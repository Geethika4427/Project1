import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import { Link } from 'react-router-dom';
import hero_image from '../Assets/hero_image.png'
const Hero = () => {
  return (
     <div className="hero">
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
        <div>
        <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
        </div>
        <p>collections</p>
        <p>for every</p>
        </div>
        <div className="hero-latest-btn">
{/*             
            <div>latest collection</div>
            <img src={arrow_icon} alt="" /> */}

<Link to="/new-collections" className="latest-collection-link">
          latest collection
          <img src={arrow_icon} alt="Arrow Icon" />
        </Link>
        </div>
    </div>
        <div className="hero-right">
           <img src={hero_image} alt="" />
        </div>

     </div>
  )
}

export default Hero