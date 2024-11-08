import React from 'react'
import '../../styles/footer.css';

export default function Footer() {
  return (
    <div>
        <footer className="footer">
            <div className="footer-container">
                <div>
                    <div>
                        <a href="/" className="logo">
                            <div className="logo bk">
                                Bk<span className="ticket">Tickets</span><sup className="lk">LK</sup>
                            </div>
                        </a>
                    </div>
                    <div>
                        <p className="intro-header">BkTickets, Sri Lanka's premier and most trusted online ticket partner, serves <br /> as the official marketplace providing a secure and safe platform for <br /> purchasing tickets to all entertainment events in Sri Lanka.</p>
                    </div>
                    <div className="social-icons">
                        <a href="/"><i className="fa-brands fa-facebook"></i></a>
                        <a href="/"><i className="fa-brands fa-instagram"></i></a>
                        <a href="/"><i className="fa-brands fa-twitter"></i></a>
                        <a href="/"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="/"><i className="fa-brands fa-youtube"></i></a>
                        <a href="/"><i className="fa-brands fa-whatsapp"></i></a>
                    </div>
                    <div className="payment-icons">
                        <img src="Images/card.png" alt="Visa" />
                        <img src="Images/mas.webp" alt="Mastercard" />
                    </div>
                </div>
                <div className="footer-column links">
                    <h3>Helpful Links</h3>
                    <ul>
                        <li><a href="/">Events</a></li>
                        <li><a href="/">MyTickets Deals</a></li>
                        <li><a href="/">My Account</a></li>
                        <li><a href="/">Refund Policy</a></li>
                    </ul>
                </div>
                <div className="footer-column links">
                    <h3>About Us</h3>
                    <ul>
                        <li><a href="/">Who We Are</a></li>
                        <li><a href="/">FAQ</a></li>
                        <li><a href="/">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-column contact">
                    <h3>Contact</h3>
                    <p><i className="fa-brands fa-whatsapp"></i> WhatsApp (Text-only service)</p>
                    <p><i className="fa-solid fa-at"></i> <a href="mailto:support@mytickets.lk">support@bktickets.lk</a></p>
                </div>
            </div>
        </footer>
    </div>
  )
}
