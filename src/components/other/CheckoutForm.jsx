import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/checkoutForm.css';

const CheckoutForm = ({ reservationId, userId, userEmail, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [className, setClassName] = useState('label');
  const [checkBox, setCheckBox] = useState('large');

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
      if (isChecked) {
        event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setIsProcessing(true);

      // Mock payment processing
      setTimeout(async () => {
        setIsProcessing(false);
        setPaymentMessage('Payment processed!');

        // Send payment data to backend
        try {
          await axios.post('http://localhost:8080/payment/process', {
            reservationId,
            userId,
            userEmail,
            amount,
          });
          console.log('Payment details saved successfully.');
          navigate('/myTickets');
        } catch (error) {
          console.error('Error saving payment details:', error);
        }
      }, 4000);
    }else{
      setClassName("danger label");
      setCheckBox("danger large");
      alert('Confirm terms and conditions first..!');
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="text-dark">
        <h3 className='size'>Set up your credit or debit card</h3>
      </div>
      <div className="d-flex text-left icons">
        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" />
        <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" />
      </div>
      <CardElement />

      <div className='text-dark mt-3 border rounded p-3'>
        <div className="d-flex justify-content-between">
          <div className='font-weight-bold mb-2'>Rs.{amount}.00</div>
        </div>
        <span className='type mt-2'></span>
      </div>
      <div className='text-dark text-small'>
        By checking the checkbox below, you agree to our Terms of Use, Privacy Statement, and that you are over 18.
      </div>
      <div className='text-dark d-flex mt-2'>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={checkBox}/>
        <label className={className}>I agree with all terms.</label>
      </div>
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
      <div className='text-dark text-small'>
        This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
      </div>
      <div style={{display:'none'}}>
        {paymentMessage}
      </div>
    </form>
  );
};

export default CheckoutForm;
