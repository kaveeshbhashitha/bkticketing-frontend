import React from 'react'
import '../../styles/topnav.css';
import Logo from './Logo';

export default function Header() {
  return (
    <div>
    <header>
        <nav className="navbar">
            <div className="flex">
                <a href="/" className="logo">
                    <Logo/>
                </a>
                <ul className="menu-links">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/">Theater</a></li>
                    <li><a href="/">Sports</a></li>
                    <li><a href="/">Other</a></li>
                    <li><a href="/">Deals</a></li>
                    <span id="close-menu-btn" className="material-symbols-outlined"><i className="fa fa-times" aria-hidden="true"></i></span>
                </ul>
            </div>
            <div className="flex rest">
                <a className="register" href='/register'>Register</a>
                <a className="signin" href='/login'><i className="fa-regular fa-circle-user"></i><span>Sign In</span></a>
            </div>
            <i className="fa-regular fa-circle-user hidden"></i>
            <span id="hamburger-btn" className="material-symbols-outlined"><i className="fa fa-solid fa-bars"></i></span>
        </nav>
    </header>
    </div>
  )
}
