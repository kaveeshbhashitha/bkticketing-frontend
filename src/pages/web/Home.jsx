import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/home.css';

export default function Home() {
  return (
    <div>
        <Header />
        {/* Search section start */}
            <section class="search hero-section">
                <div class="content">
                    <h2>Let’s Book Your Ticket</h2>
                    <p>Discover your favorite entertainment right here</p>
                    <div class="search-bar">
                        <i class="fa fa-search" aria-hidden="true"></i> 
                        <input type="text" placeholder="Search by Artist, Event or Venue" />
                        <button type="submit">Search</button>
                    </div>
                </div>
            </section>
            {/* Search section end */}

            <div class="midsection">
                <div class="content-info">
                    <div>
                        <h1 class="midtitle">Transfer & Resend Tickets</h1>
                    </div>
                    <div>
                        <p>Get registered with BkTicket to transfer and receive E-Ticket(s). <br /> Spread the joy by seamlessly transferring tickets to friends and <br /> family.</p>
                    </div>
                    <div class="infobutton">
                        <button class="resend">
                            <i class="fa fa-solid fa-arrow-rotate-right"></i> Resend e-Ticket
                        </button>
                        <button class="transfer">
                            <i class="fa-solid fa-retweet"></i> Transfer Ticket
                        </button>
                    </div>
                </div>
                <div class="infoback">
                    <image src="Images/file.png" alt="" />
                </div>
            </div>

        <Footer />
        <FooterRest />
    </div>
  )
}
