import React from 'react';
import '../../styles/footer.css';

export default function FooterRest() {
    let year = new Date().getFullYear();
  return (
    <div>
        <div class="footerheader">
        <div>
            <a href="/">
                Privacy Policy |
            </a>
            <a href="/">
                Cookie Policy |
            </a>
            <a href="/">
                Terms and Conditions
            </a>
        </div>
        <div class="rightcontent">
            <p>Copyright 2014- {year} &copy Bk Tickets All Rights Reserved</p>
        </div>
    </div>
    </div>
  )
}
