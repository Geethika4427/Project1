
// import './NewsLetter.css'
// const NewsLetter = () => {
//   return (
//     <div className="newsletter">
//        <h1>get explosive offers on your email</h1>
//        <p>subscribe to our newsletter and stay updated</p>
//        <div>
//         <input type="email" placeholder='Your Email id' />
//         <button>subscribe</button>
//        </div>
//     </div>
//   )
// }


import './NewsLetter.css';
import { useState } from 'react'; // Import useState

const NewsLetter = () => {
  // State to hold email input
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // State to hold success or error message

  // Function to handle subscription
  const handleSubscribe = async () => {
    if (email.trim() === '') {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Simulate an API call to subscribe the user
      // Replace this with your actual API call logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set success message
      setMessage('Subscribed successfully!');
      
      // Clear the email input
      setEmail('');
    } catch (error) {
      // Set error message if the API call fails
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="newsletter">
      <h1>get explosive offers on your email</h1>
      <p>subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder="Your Email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>subscribe</button>
      </div>
      {/* Display message */}
      {message && <p className="newsletter-message">{message}</p>}
    </div>
  );
};

export default NewsLetter;

