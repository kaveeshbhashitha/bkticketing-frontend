import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../../styles/checkoutForm.css';
import '../../styles/continue.css'
import CheckoutForm from '../../components/other/CheckoutForm';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FooterRest from '../../components/layout/FooterRest';

const stripePromise = loadStripe('pk_test_51NHnWuSCKBfIrcyXTDjnlJ02Q1NrzvaXIcxUYJnMzxhs6m3YlOI6086oNufEMnQd76GPnFYFp3F4tpj74rShq3lH00L3MDtZ5i');

const Payment = () => {
  return (
      <div>
        <Header/>
        <div className='hr'></div>
            <div class="payment-layout">
                <div class="paymentfinal">
                    <img src="/Images/img1.jpg" alt="event" className='event-image'/>
                    <div class="title">BALLAD OF THE WARRIORS</div>
                    <div class="organizer">ORGANIZED BY THE VETERANS OF SPECIAL FORCES</div>
                    <div class="date">Nov 09, 2024 06.30 PM IST</div>
                    <div class="venue">Bishops College Auditorium</div>
                    <div class="price">1,500 LKR Per one</div>
                </div>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </div>
            </div>
        <Footer/>
        <FooterRest/>
      </div>
  );
};

export default Payment;